# -*- coding: utf-8 -*-

import logging
import sys
import json

from starlette.requests import Request

sys.path.insert(0, "../")

from common.singleton import Singleton
from common.utils import async_time_consumer, CommonEncoder, CommonDecoder, run_sync
from components.redis_db.redis_clients import redisCacheIns, get_redisCacheIns
from config.redis_config import USER_CACHE_KEY, USER_ID_ADDRESS_MAP_KEY
from datasource.account_user_ds import AccountUserDataSource


class UserCache(metaclass=Singleton):
    CACHE_TM_SEC = 60 * 5

    def __init__(self):
        self.accountUserDsIns = AccountUserDataSource()

    async def initialize(self):
        await self.accountUserDsIns.initialize()
        self.redis_cache = await get_redisCacheIns()

    @async_time_consumer
    async def get_user_by_address(self, address: str) -> dict:
        key = USER_CACHE_KEY.format(address=address)
        user_info = await self.redis_cache.get(key)
        if user_info:
            return json.loads(user_info, cls=CommonDecoder)
        else:
            user_dict = await self.accountUserDsIns.get_user_by_address_with_no_cache(address)
            if user_dict:
                await self.load_user_cache(user_dict)
            return user_dict

    @async_time_consumer
    async def get_user_by_user_id(self, user_id: int) -> dict:
        user_address = await self.get_address_by_user_id(user_id)
        return await self.get_user_by_address(user_address)

    async def clear_user_cache(self, address: str):
        key = USER_CACHE_KEY.format(address=address)
        if await self.redis_cache.exists(key):
            await self.redis_cache.delete(key)


async def get_userCacheIns():
    ins = UserCache()
    await ins.initialize()
    return ins


async def run_test():
    userCacheIns = await get_userCacheIns()
    r = await userCacheIns.get_user_by_address("0x123")
    print(r)

if __name__ == '__main__':
    run_sync(run_test())