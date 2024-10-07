# -*- coding: utf-8 -*-


from config.env_config import REDIS_HOST, REDIS_PORT, REDIS_PASSWD


DEFAULT_DB = 0  # reserved db=0 for third software use
CACHE_DB = 0  # use for cache
VALIDATE_DB = 0  # use for save unconfirmed user info
SESSION_AUTH_DB = 0  # use account/login auth session state
REDIS_DEFAULT_POOL_MAXSIZE = 100
DEFAULT_REDIS_EXPIRE_TIME_SECS = 5 * 60 + 10

CACHE_REDIS_CONFIG = {
    "server": REDIS_HOST,
    "port": REDIS_PORT,
    "password": REDIS_PASSWD,
    "db": CACHE_DB,
    "maxsize": REDIS_DEFAULT_POOL_MAXSIZE,
}

VALIDATE_REDIS_CONFIG = {
    "server": REDIS_HOST,
    "port": REDIS_PORT,
    "password": REDIS_PASSWD,
    "db": VALIDATE_DB,
    "maxsize": REDIS_DEFAULT_POOL_MAXSIZE,
}

USER_SESSION_REDIS_CONFIG = {
    "server": REDIS_HOST,
    "port": REDIS_PORT,
    "password": REDIS_PASSWD,
    "db": SESSION_AUTH_DB,
    "maxsize": REDIS_DEFAULT_POOL_MAXSIZE,
}
