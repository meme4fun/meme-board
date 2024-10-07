#!/usr/bin/env python
import asyncio
import logging
import random

from aiohttp import ServerTimeoutError
from asyncio.exceptions import TimeoutError
from common.http_client import HttpClient
from common.utils import run_sync, EnumBase, async_ttl_cache, async_request_rate_limit
from const.env_const import ENV_DEV, ENV_PROD
import urllib.parse


def retry(max_retries=5, sleep=20.0):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            retries = 0
            while retries < max_retries:
                try:
                    response = await func(*args, **kwargs)
                except (ServerTimeoutError, TimeoutError):
                    response = None

                if isinstance(response, dict) and response.get("code") == 200:
                    return response

                retries += 1
                logging.info(f"[nftscan retry] func={func} response={response} retrying... loop={retries}")
                await asyncio.sleep(sleep * retries)
            return response

        return wrapper

    return decorator


semaphore = asyncio.Semaphore(5)  # limit 10 call/s


class NFTScanClient(HttpClient):
    BASE_URL = "https://restapi.nftscan.com"
    API_KEY_LIST = [
    ]
    PRO_API_KEY = ""

    def __init__(self):
        super(NFTScanClient, self).__init__()
        self.semaphore = asyncio.Semaphore(4 * len(self.API_KEY_LIST))

    def build_url(self, path):
        return f"{self.BASE_URL}{path}"

    @property
    def headers(self):
        headers = {
            "Accept": "application/json",
            "X-API-KEY": random.choice(self.API_KEY_LIST)
        }
        return headers

    @property
    def pro_headers(self):
        headers = {
            "Accept": "application/json",
            "X-API-KEY": self.PRO_API_KEY
        }
        return headers

    @async_request_rate_limit(semaphore)
    @retry(1, sleep=0.5)
    async def _get(self, path, use_pro=False):
        url = self.build_url(path)
        if use_pro:
            headers = self.pro_headers
        else:
            headers = self.headers
        async with self.semaphore:
            r = await self.get(url, headers=headers)
            await asyncio.sleep(1)
            return r

    async def get_wallet_nfts(self, account_address, limit=1000, erc_type=None, cursor=None):
        path = f"/api/v2/account/own/{account_address}?erc_type={erc_type}&limit={limit}"
        if cursor:
            path += f"&cursor={cursor}"
        return await self._get(path)

    async def get_account_overview(self, account_address):
        """
        {
            "code":200
            "msg":NULL
            "data": {
                "holding_value":158.04
                "bought_value":591.8
                "sold_value":399.56
                "gas_value":561.17
                "holding_value_usdt":211131.96
                "bought_value_usdt":790609.29
                "sold_value_usdt":533788.19
                "gas_value_usdt":749689.45
                "holding_count":2592
                "mint_count":2169
                "bought_count":893
                "sold_count":404
                "send_count":270
                "receive_count":148
                "burn_count":6
            }
        }
        """
        path = f"/api/v2/statistics/overview/{account_address}"
        return await self._get(path, use_pro=True)

    async def get_collection_statistics(self, contract_address):
        path = f"/api/v2/statistics/collection/{contract_address}"
        return await self._get(path, use_pro=True)

    async def get_collection_trending(self, contract_address, interval):
        path = f"/api/v2/statistics/collection/trending/{contract_address}?time={interval}"
        return await self._get(path, use_pro=True)

    async def get_collection_holding_amount_distribution(self, contract_address):
        path = f"/api/v2/statistics/amount/distribution/{contract_address}"
        return await self._get(path, use_pro=True)

    async def get_collection_holding_period_distribution(self, contract_address):
        path = f"/api/v2/statistics/period/distribution/{contract_address}"
        return await self._get(path, use_pro=True)

    async def get_blue_chip_overview(self, contract_address):
        path = f"/api/v2/statistics/blue/chip/{contract_address}"
        return await self._get(path, use_pro=True)

    async def get_blue_chip_list(self, contract_address):
        path = f"/api/v2/statistics/blue/chip/list?contract_address={contract_address}&sort_field=mutual_holders&sort_direction=desc"
        return await self._get(path, use_pro=True)

    async def get_ranking_collection(self, sort_field, sort_direction, limit=100):
        path = f"/api/v2/statistics/ranking/collection?sort_field={sort_field}&sort_direction={sort_direction}&limit={limit}"
        return await self._get(path, use_pro=True)

    async def get_ranking_gas(self):
        path = f"/api/v2/statistics/ranking/gas?show_24h_trends=true"
        return await self._get(path, use_pro=True)

    async def get_account_transactions(self, account_address):
        path = f"/api/v2/transactions/account/{account_address}"
        return await self._get(path, use_pro=True)


nftscanClientIns = NFTScanClient()

if __name__ == '__main__':
    pass
    # print(moralisClientIns.headers)
    resp = run_sync(nftscanClientIns.get_wallet_nfts("0x0d1f2c041b7f9702903b89057c1f57f1f01a79af", erc_type="erc721"))
    print(resp)
