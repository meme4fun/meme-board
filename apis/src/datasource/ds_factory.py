from aio_ds.aio_pool import AIOPool
from common.utils import run_sync
from config.db_config import MYSQL_DB_SETTING, INS_MYSQL_DB_SETTING, MYSQL_DB_SETTING


class DBDataSource(AIOPool):
    @classmethod
    def getInstance(cls, loop=None):
        if not hasattr(cls, "_instance"):
            cls._instance = cls()
        return cls._instance

    @staticmethod
    async def init_pool(loop):
        db_setting = MYSQL_DB_SETTING['db_setting']
        pool_size = MYSQL_DB_SETTING['pool_size']
        ins = await AIOPool.get_pool(db_setting, pool_size, loop)
        DBDataSource._instance = ins
        return ins
