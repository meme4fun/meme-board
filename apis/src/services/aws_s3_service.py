import logging
import sys
import boto3
import json
import requests
import time
import aiofiles
import os
import hashlib
import mimetypes
from urllib.parse import urlparse
from aiohttp import ClientTimeout
from web3 import Web3
import asyncio

sys.path.insert(0, "../")

from common.syncasync import sync_to_async
from common.singleton import Singleton
from common.utils import run_sync, run_sync_clean
from config.aws_config import AWS_IDENTITY_POOL_ID, AWS_IDENTITY_POOL_ARN, AWS_REGION, AWS_BUCKET_NAME, \
    AWS_BUCKET_ARN, AWS_ROW_ARN, AWS_S3_URL_ExpiresIn
from caches.user_cache import get_userCacheIns
from common.http_client import httpClientIns
from datasource.ds_factory import DBDataSource

MAX_DOWNLOAD_RETRY_TIMES = 10


class AwsS3Service(metaclass=Singleton):

    def __init__(self):
        self.upload_history_tb = "upload_history_tb"
        super(AwsS3Service, self).__init__()

    async def initialize(self):
        loop = asyncio.get_running_loop()
        self.dbPool = await DBDataSource.init_pool(loop)
        self.user_cache = await get_userCacheIns()

    async def get_exist_image_info(self, from_url):
        original_url = from_url
        sql = f"SELECT * FROM {self.upload_history_tb} WHERE original_url=%s"
        rows = await self.dbPool.query(sql, (original_url,)) or []
        if len(rows) == 0:
            insert_sql = f"INSERT INTO {self.upload_history_tb} (original_url, tried_times) VALUES (%s, %s)"
            await self.dbPool.execute(insert_sql, (original_url, 0))
            return None
        return rows[0]

    async def update_image_info(self, from_url, s3_url, content_type, file_md5):
        original_url = from_url
        sql = f"UPDATE {self.upload_history_tb} SET s3_url=%s, content_type=%s, file_md5=%s, tried_times=tried_times+1 WHERE original_url=%s"
        await self.dbPool.execute(sql, (s3_url, content_type, file_md5, original_url))

    async def update_tried_times(self, from_url):
        original_url = from_url
        sql = f"UPDATE {self.upload_history_tb} SET tried_times=tried_times+1 WHERE original_url=%s"
        await self.dbPool.execute(sql, original_url)

    @sync_to_async
    def boto3_create_client(self, client_type, **kwargs):
        return boto3.client(client_type, **kwargs)

    @sync_to_async
    def async_call_method(self, boto3_client, method, **kwargs):
        func = getattr(boto3_client, method)
        return func(**kwargs)

    async def get_s3_client(self, user_content_policy):
        cognito = await self.boto3_create_client("cognito-identity", region_name=AWS_REGION)
        identity_response = await self.async_call_method(cognito, "get_id", IdentityPoolId=AWS_IDENTITY_POOL_ID)
        identity_id = identity_response["IdentityId"]

        oidc_response = await self.async_call_method(cognito, "get_open_id_token", IdentityId=identity_id)
        oidc_token = oidc_response["Token"]

        policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket",
                        "s3:GetObject",
                        "s3:PutObject",
                        "s3:DeleteObject"
                    ],
                    "Resource": AWS_BUCKET_ARN,
                    "Condition": {
                        "StringLike": {
                            "s3:prefix": [
                                user_content_policy
                            ]
                        }
                    }

                }
            ]
        }

        sts = await self.boto3_create_client("sts", region_name=AWS_REGION)
        assume_role_response = await self.async_call_method(
            sts,
            "assume_role_with_web_identity",
            RoleArn=AWS_ROW_ARN,
            RoleSessionName="session",
            WebIdentityToken=oidc_token,
            Policy=json.dumps(policy)
        )
        credentials = assume_role_response["Credentials"]
        s3 = await self.boto3_create_client(
            "s3",
            aws_access_key_id=credentials["AccessKeyId"],
            aws_secret_access_key=credentials["SecretAccessKey"],
            aws_session_token=credentials["SessionToken"],
            region_name=AWS_REGION
        )
        return s3

    @staticmethod
    async def save_file(content, filename):
        local_filename = f"/tmp/short/{filename}"
        async with aiofiles.open(local_filename, 'wb') as f:
            await f.write(content)
        return local_filename

    async def upload_image_to_s3(self, s3, from_url, target_s3_prifix):
        logging.info(f"[upload_image_to_s3] start upload to s3, from_url={from_url}")
        exist_image_info = await self.get_exist_image_info(from_url)
        if exist_image_info:
            if exist_image_info["s3_url"]:
                return exist_image_info["s3_url"], exist_image_info["content_type"]
            elif exist_image_info["tried_times"] > MAX_DOWNLOAD_RETRY_TIMES:
                return from_url, ""
        try:
            response = await httpClientIns.download(from_url, timeout=ClientTimeout(total=15))
            if not response:
                await self.update_tried_times(from_url)
                return from_url, ""
            if 'html' in response['content_type'] or 'json' in response['content_type']:
                logging.warning(
                    f"[upload_image_to_s3] download failed, from_url={from_url}, content_type={response['content_type']}")
                await self.update_tried_times(from_url)
                return from_url, ""
            logging.info(
                f"[upload_image_to_s3] download succeed, from_url={from_url}, content_type={response['content_type']}")
        except Exception as ex:
            logging.exception(f"[upload_image_to_s3] download failed, from_url={from_url}, ex={str(ex)}")
            await self.update_tried_times(from_url)
            return from_url, ""
        key = hashlib.md5(response['content']).hexdigest()
        parsed_url = urlparse(from_url)
        url_filename = os.path.basename(parsed_url.path)
        filename_parts = url_filename.split('.')
        extension = f".{filename_parts[-1]}" if len(filename_parts) > 1 else ''
        if not extension:
            extension = mimetypes.guess_extension(response['content_type'])
        filename = f"{key}{extension}" if extension != '' else key
        object_key = f"{target_s3_prifix}/{filename}"
        logging.info(f"[upload_image_to_s3] do upload, from_url={from_url}, obj_key={object_key}")
        local_filename = await self.save_file(response['content'], filename)

        await self.async_call_method(
            s3,
            "upload_file",
            Filename=local_filename,
            Bucket=AWS_BUCKET_NAME,
            Key=object_key,
            ExtraArgs={'ContentType': response['content_type']}
        )
        os.remove(local_filename)
        s3_url = f'https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{object_key}'

        await self.update_image_info(from_url, s3_url, response['content_type'], key)
        return s3_url, response['content_type']

    async def get_token_datas(self, dir_name, user_address, filename):
        user_address = Web3.to_checksum_address(user_address)
        user = await self.user_cache.get_user_by_address(user_address)
        invite_code = user["invite_code"]
        if not invite_code:
            return None
        user_content_policy = f"{dir_name}/{invite_code}/*"
        s3 = await self.get_s3_client(user_content_policy)
        url = await self.async_call_method(
            s3,
            "generate_presigned_url",
            ClientMethod='put_object',
            Params={
                'Bucket': AWS_BUCKET_NAME,
                'Key': f"{dir_name}/{invite_code}/{filename}.png",
                'ContentType': 'image/png'
            },
            ExpiresIn=AWS_S3_URL_ExpiresIn
        )
        return url


awsS3ServiceIns = None


async def get_awsS3ServiceIns():
    global awsS3ServiceIns
    if awsS3ServiceIns:
        return awsS3ServiceIns
    else:
        ins = AwsS3Service()
        await ins.initialize()
        awsS3ServiceIns = ins
    return ins


if __name__ == '__main__':
    run_sync_clean(awsS3ServiceIns.get_s3_client(""))
