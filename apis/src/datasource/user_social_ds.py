import logging
import asyncio

from base.status_code import STATUS_UPDATE_DB_FAILED
from common.common_exception import CommonException
from common.date_conv import ts_to_date
from common.singleton import Singleton
from common.utils import async_time_consumer, TableTools
from datasource.ds_factory import DBDataSource


class UserSocialDataSource(metaclass=Singleton):
    tw_token_tb_fields = ""
    social_tb_fields = ""

    def __init__(self):
        self.auth_token_tb = 'auth_token_tb'
        self.user_social_tb_name = 'user_social_tb'

        self.logging = logging.getLogger(f"{self.__class__.__name__}")
        self.logging.info(f'init {self.__class__.__name__}')

    async def initialize(self):
        loop = asyncio.get_running_loop()
        self.dbPool = await DBDataSource.init_pool(loop)

    @async_time_consumer
    async def get_social_info_by_user_id(self, user_id):
        stmt = "SELECT " + self.social_tb_fields + " FROM {} WHERE `user_id`=%s limit 1"
        query = stmt.format(self.user_social_tb_name)
        params = (user_id,)
        rows = await self.dbPool.query(query, params)
        rs = rows[0] if rows and len(rows) == 1 else None
        return rs

    @async_time_consumer
    async def get_social_info_by_user_ids(self, user_ids):
        if not user_ids:
            return None

        user_ids_str = TableTools.build_list_to_str(user_ids)
        sql = f"SELECT {self.social_tb_fields} FROM {self.user_social_tb_name} WHERE user_id IN ({user_ids_str})"
        cur = await self.dbPool.execute(sql)
        rows = await cur.fetchall() or []
        user_social_info_map = dict()
        for row in rows:
            user_social_info_map[row["user_id"]] = row
        return user_social_info_map

    @async_time_consumer
    async def get_social_info_by_twitter_uid(self, twitter_uid):
        stmt = "SELECT " + self.social_tb_fields + " FROM {} WHERE `twitter_uid`=%s limit 1"
        query = stmt.format(self.user_social_tb_name)
        params = (twitter_uid,)
        rows = await self.dbPool.query(query, params)
        rs = rows[0] if rows and len(rows) == 1 else None
        return rs

    @async_time_consumer
    async def get_social_info_by_discord_uid(self, discord_uid):
        stmt = "SELECT " + self.social_tb_fields + " FROM {} WHERE `discord_uid`=%s limit 1"
        query = stmt.format(self.user_social_tb_name)
        params = (discord_uid,)
        rows = await self.dbPool.query(query, params)
        rs = rows[0] if rows and len(rows) == 1 else None
        return rs

    @async_time_consumer
    async def get_users_bind_social(self):
        stmt = "SELECT `user_id`, `twitter_uid`, `discord_uid` FROM {}"
        query = stmt.format(self.user_social_tb_name)
        rows = await self.dbPool.query(query)
        return rows

    # async def replace_user_social_info(self, user_id, twitter_username, twitter_uid):
    #     stmt = "REPLACE INTO `{}` " \
    #            f"({self.social_tb_fields}) " \
    #            "VALUES " \
    #            "(%s, %s, %s)"
    #     query = stmt.format(self.user_social_tb_name)
    #     params = (user_id, twitter_username, twitter_uid)
    #     await self.dbPool.upsert(query, params)

    @async_time_consumer
    async def upsert_user_social_info(self, fields):
        await self.dbPool.insert_dup_update_form_fields(self.user_social_tb_name, fields)

    @async_time_consumer
    async def replace_token(self, user_id, src, token_type, scope, access_token, access_ctime, access_exptime,
                            refresh_token):
        query = f"REPLACE INTO `{self.auth_token_tb}` " \
                f"({self.tw_token_tb_fields}) " \
                "VALUES " \
                "(%s, %s, %s, %s, %s, %s, %s, %s)"
        params = (user_id, src, token_type, scope, access_token, access_ctime, access_exptime, refresh_token)
        await self.dbPool.upsert(query, params)

    @async_time_consumer
    async def get_token_by_user_id(self, user_id, src):
        stmt = "SELECT " + self.tw_token_tb_fields + " FROM {} WHERE `user_id`=%s and `src`=%s limit 1"
        query = stmt.format(self.auth_token_tb)
        params = (user_id, src)
        rows = await self.dbPool.query(query, params)
        rs = rows[0] if rows and len(rows) == 1 else None
        return rs


userSocialDataSourceIns = None


async def get_userSocialDataSourceIns():
    global userSocialDataSourceIns
    if userSocialDataSourceIns:
        return userSocialDataSourceIns
    else:
        ins = UserSocialDataSource()
        await ins.initialize()
        userSocialDataSourceIns = ins
    return ins
