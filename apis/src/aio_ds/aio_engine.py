# -*- coding: utf-8 -*-


import asyncio

from aiomysql.sa import create_engine

from config.env_config import IS_DEBUG


class AIOEngine(object):
    def __init__(self, db_setting, loop=None, pool_size=5):
        self.loop = loop or asyncio.get_event_loop()
        self.engine = self.run_sync(self.__create_aio_engine(db_setting, self.loop, pool_size))

    async def __create_aio_engine(self, db_setting, loop, pool_size):
        engine = await create_engine(maxsize=pool_size,
                                     host=db_setting['host'],
                                     port=db_setting['port'],
                                     user=db_setting['user'],
                                     password=db_setting['passwd'],
                                     autocommit=db_setting['autocommit'],
                                     echo=IS_DEBUG,
                                     loop=loop)
        return engine

    def run_sync(self, future):
        return self.loop.run_until_complete(future)
