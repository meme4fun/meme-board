

from aiomysql import DictCursor

from config.env_config import ENV_DEV, ENV_TEST, ENV_PROD
from config.git_config import CUR_ENV

if CUR_ENV == ENV_DEV:
    MYSQL_HOST = ''
    MYSQL_PORT = 3306
    MYSQL_USER = ""
    MYSQL_PASSWD = ''
elif CUR_ENV == ENV_TEST:
    MYSQL_HOST = ''
    MYSQL_PORT = 3306
    MYSQL_USER = ""
elif CUR_ENV == ENV_PROD:
    MYSQL_HOST = ''
    MYSQL_PORT = 3306
    MYSQL_USER = ""
    MYSQL_PASSWD = ''


MYSQL_DB_SETTING = {
    'db_setting': {
        "host": MYSQL_HOST,
        "port": MYSQL_PORT,
        "user": MYSQL_USER,
        "passwd": MYSQL_PASSWD,
        "db": "meme4fun_db",
        "cursorclass": DictCursor,
        "charset": 'utf8',
        "autocommit": True,
    },
    "pool_size": 10
}

