import logging

from aio_ds.aio_redis import _RedisManager
from aio_ds.aio_trx_redis import _RedisTrxManager
from config.redis_config import CACHE_REDIS_CONFIG, VALIDATE_REDIS_CONFIG, USER_SESSION_REDIS_CONFIG


class RedisCache(_RedisManager):

    def __init__(self):
        super(RedisCache, self).__init__(CACHE_REDIS_CONFIG)

    @classmethod
    def instance(cls):
        if not hasattr(cls, "_instance"):
            _logging = logging.getLogger("RedisCache")
            _logging.info("init RedisCache")
            cls._instance = cls()
        return cls._instance


redisCacheIns = None
