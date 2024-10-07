# -*- coding: utf-8 -*-


import logging
import asyncio

import aioredis
import aioredis_cluster
import sys
import pickle
from config.env_config import CUR_ENV, ENV_DEV
from loguru import logger

sys.path.append('../')

from config.redis_config import DEFAULT_REDIS_EXPIRE_TIME_SECS
from common.utils import async_time_consumer, run_sync


def list_or_args(keys, args):
    # returns a single new list combining keys and args
    try:
        iter(keys)
        # a string or bytes instance can be iterated, but indicates
        # keys wasn't passed as a list
        if isinstance(keys, (str, bytes)):
            keys = [keys]
        else:
            keys = list(keys)
    except TypeError:
        keys = [keys]
    if args:
        keys.extend(args)
    return keys


class _RedisManager(object):
    '''
    Redis connection manager
    '''

    def __init__(self, redis_config):
        self.redis_config = redis_config

    async def initialize(self):
        self.redis = await self._create_pool(self.redis_config)

    async def _create_pool(self, redis_config):
        # redis://localhost
        address = f"redis://{redis_config['server']}:{redis_config['port']}"
        print(f'_RedisManager _create_pool address={address}')
        password = redis_config['password'] if redis_config['password'] else None
        maxsize = redis_config['maxsize']
        return await aioredis.create_redis_pool(address=address,
                                                password=password,
                                                db=redis_config['db'],
                                                encoding='utf-8',
                                                maxsize=maxsize)

    async def close(self):
        if self.redis:
            self.redis.close()
            await self.redis.wait_closed()
            self.redis = None

    def get_redis(self):
        return self.redis

    @async_time_consumer
    async def set(self, key, value, expire=DEFAULT_REDIS_EXPIRE_TIME_SECS):
        # TODO: batch/pipeline
        try:
            result = await self.redis.set(key, value, expire=expire)
            if result:
                logging.debug('set success, key=%s, value=%s', key, value)
            else:
                logging.error('set failed, key=%s, value=%s', key, value)
            return result
        except Exception as ex:
            logging.error('_RedisManager set exception=%s, key=%s, value=%s', ex, key, value)

    async def setnx(self, key, value):
        try:
            return await self.redis.setnx(key, value)
        except Exception as ex:
            logging.error('_RedisManager setnx exception=%s', ex)

    async def getset(self, key, value):
        try:
            return await self.redis.getset(key, value)
        except Exception as ex:
            logging.error('_RedisManager getset exception=%s', ex)

    @async_time_consumer
    async def get(self, key, encoding='utf-8'):
        # TODO: batch/pipeline
        try:
            return await self.redis.get(key, encoding=encoding)
        except Exception as ex:
            logger.error('_RedisManager get exception=%s', ex)
        return None

    @async_time_consumer
    async def lpush(self, name, *values):
        try:
            return await self.redis.lpush(name, *values)
        except Exception as ex:
            logging.error('_RedisManager lpush exception=%s', ex)
        return None

    @async_time_consumer
    async def lpop(self, name):
        try:
            return await self.redis.lpop(name)
        except Exception as ex:
            logging.error('_RedisManager lpop exception=%s', ex)
        return None

    @async_time_consumer
    async def rpop(self, name):
        try:
            return await self.redis.rpop(name)
        except Exception as ex:
            logging.error('_RedisManager rpop exception=%s', ex)
        return None

    @async_time_consumer
    async def rpush(self, name, *values):
        try:
            return await self.redis.rpush(name, *values)
        except Exception as ex:
            logging.error('_RedisManager rpush exception=%s', ex)
        return None
    
    @async_time_consumer
    async def spop(self, name, count=1):
        try:
            return await self.redis.spop(name, count)
        except Exception as ex:
            logging.error('_RedisManager spop exception=%s', ex)
        return None

    async def lrange(self, name, start, stop):
        try:
            return await self.redis.lrange(name, start, stop)
        except Exception as ex:
            logging.error('_RedisManager lrange exception=%s', ex)
        return None

    async def llen(self, key):
        return await self.redis.llen(key)

    async def incr(self, key):
        return await self.redis.incr(key)
    
    async def incrby(self, key, increment):
        return await self.redis.incrby(key, increment)

    async def delete(self, key):
        return await self.redis.delete(key)

    async def exists(self, key):
        return await self.redis.exists(key)

    @async_time_consumer
    async def hset(self, key, field, value, expire=None):
        return await self.redis.hset(key, field, value)

    @async_time_consumer
    async def hget(self, key, field):
        return await self.redis.hget(key, field, encoding='utf-8')

    @async_time_consumer
    async def hgetall(self, key):
        return await self.redis.hgetall(key, encoding='utf-8')

    async def hkeys(self, key):
        return await self.redis.hkeys(key, encoding='utf-8')

    @async_time_consumer
    async def hmset(self, name, mapping):
        return await self.redis.hmset_dict(name, mapping)

    @async_time_consumer
    async def hmget(self, name, keys, *args):
        args = list_or_args(keys, args)
        return await self.redis.hmget(name, *args, encoding='utf-8')

    @async_time_consumer
    async def hmset_with_expire(self, name, mapping, expire=None):
        # expire_after = time
        # Complicate mapping object cache with expire time
        r1 = await self.redis.hmset_dict(name, mapping)
        r2 = await self.redis.expire(name, expire) if expire else None
        return r1, r2

    async def hdel(self, name, *keys):
        return await self.redis.hdel(name, *keys)

    async def hexists(self, name, key):
        return await self.redis.hexists(name, key)

    async def expire(self, name, time):
        """
        Set an expire flag on key ``name`` for ``time`` seconds. ``time``
        can be represented by an integer or a Python timedelta object.
        """
        return await self.redis.expire(name, time)

    async def expire_at(self, name, when):
        return await self.redis.expireat(name, when)

    async def keys(self, pattern):
        # https://redis.io/commands/keys
        # Warning: consider KEYS as a command that should only be used in production environments with extreme care.
        # It may ruin performance when it is executed against large databases.
        # This command is intended for debugging and special operations, such as changing your keyspace layout. Don't use KEYS in your regular application code.
        # If you're looking for a way to find keys in a subset of your keyspace, consider using SCAN or sets.
        return await self.redis.keys(pattern)

    async def set_object(self, key, obj, expire=DEFAULT_REDIS_EXPIRE_TIME_SECS):
        # save complicate object type to redis
        # Warning The pickle module is not intended to be secure against erroneous or maliciously constructed data.
        # Never unpickle data received from an untrusted or unauthenticated source.
        # Only use it internal
        if isinstance(obj, (int, float, str, list, dict)):
            logging.warning("simple type no need to use pick, just use native type or json.dumps")
        value = pickle.dumps(obj)
        return await self.redis.set(key, value, expire=expire)

    async def get_object(self, key, object_type=None, encoding=None):
        result = await self.redis.get(key, encoding=encoding)
        if object_type:
            # try to contruct with object_type
            return object_type(result)
        else:
            return pickle.loads(result)

    async def zrange(self, key, start, end):
        return await self.redis.zrange(key, start, end)

    @async_time_consumer
    async def zrangebyscore(self, key, min=float("-inf"), max=float("inf"), withscores=False):
        return await self.redis.zrangebyscore(key, min, max, withscores)

    @async_time_consumer
    async def zadd(self, big_key, score, small_key):
        return await self.redis.zadd(big_key, score, small_key)

    @async_time_consumer
    async def zadd_batch(self, big_key, mapping: dict):
        if not mapping:
            return
        command_items = [big_key]
        for small_key, score in mapping.items():
            command_items.extend([score, small_key])
        return await self.redis.zadd(*command_items)

    async def zrem(self, big_key, small_key):
        return await self.redis.zrem(big_key, small_key)

    async def zincrby(self, big_key, score, small_key):
        return await self.redis.zincrby(big_key, score, small_key)

    @async_time_consumer
    async def zrank(self, big_key, small_key):
        return await self.redis.zrank(big_key, small_key)

    @async_time_consumer
    async def zrevrank(self, big_key, small_key):
        return await self.redis.zrevrank(big_key, small_key)

    @async_time_consumer
    async def zrevrange(self, big_key, start, stop, withscores=False):
        return await self.redis.zrevrange(big_key, start, stop, withscores)

    async def zscore(self, big_key, small_key):
        return await self.redis.zscore(big_key, small_key)

    async def zcount(self, name, start_score, end_score):
        try:
            return await self.redis.zcount(name, start_score, end_score)
        except Exception as ex:
            logging.error(f'_Redis zcount ex={ex}, key={name}, '
                          f'start_score={start_score}, end_score={end_score}')
            raise ex

    @async_time_consumer
    async def zremrangebyscore(self, name, start_score, end_score):
        try:
            return await self.redis.zremrangebyscore(name, start_score, end_score)
        except Exception as ex:
            logging.error(f'_Redis zremrangebyscore exception={ex}, key={name}, '
                          f'start_score={start_score}, end_score={end_score}')

    async def decr(self, key):
        return await self.redis.decr(key)

    async def smembers(self, key):
        return await self.redis.smembers(key)

    async def sismember(self, key, member):
        return await self.redis.sismember(key, member)

    async def sadd(self, key, member, *members):
        return await self.redis.sadd(key, member, *members)

    async def sadd_with_expire(self, key, member, *members, expire=None):
        r1 = await self.redis.sadd(key, member, *members)
        r2 = await self.redis.expire(key, expire) if expire else None
        return r1, r2

    async def scard(self, key):
        return await self.redis.scard(key)

    def scan(self, cursor=0, match=None, count=None):
        return self.redis.scan(cursor, match, count)
