# -*- coding: utf-8 -*-
import asyncio
import sys
from aredis import StrictRedisCluster


sys.path.append('../')

from common.singleton import Singleton
from config.redis_config import DEFAULT_REDIS_EXPIRE_TIME_SECS
from common.utils import async_time_consumer


class _RedisTrxManager(metaclass=Singleton):
    def __init__(self, redis_config):
        self.redis_config = redis_config

    async def initialize(self):
        self.redis = await self._create_pool(self.redis_config)

    async def _create_pool(self, redis_config):
        startup_nodes = [
            {"host": redis_config['server'], "port": redis_config['port']}
        ]
        password = redis_config['password'] if redis_config['password'] else None
        maxsize = redis_config['maxsize']
        return StrictRedisCluster(startup_nodes=startup_nodes, skip_full_coverage_check=True, password=password,
                                  encoding='utf-8', max_connections=maxsize)

    async def close(self):
        if self.redis:
            self.redis.close()
            await self.redis.wait_closed()
            self.redis = None

    async def pipeline(self):
        return await self.redis.pipeline()

    @staticmethod
    async def execute(pipe):
        return await pipe.execute()

    @async_time_consumer
    async def set(self, key, value, expire=DEFAULT_REDIS_EXPIRE_TIME_SECS, trx=None):
        await trx.set(key, value, ex=expire)

    @async_time_consumer
    async def zadd(self, big_key, score, small_key, trx=None):
        await trx.zadd(big_key, score, small_key)

    @async_time_consumer
    async def hset(self, name, key, value, trx=None):
        await trx.hset(name, key, value)
