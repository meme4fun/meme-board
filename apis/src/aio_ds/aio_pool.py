
import json
import logging

import aiomysql
from pymysql import converters
from pymysql.constants import SERVER_STATUS
from pymysql.converters import escape_bytes_prefixed, escape_item

from base.status_code import STATUS_INSERT_DB_FAILED
from common.common_exception import CommonException
from common.utils import async_time_consumer
from config.env_config import IS_DEBUG

IS_DEBUG_DEFAULT = IS_DEBUG


def JSONIZE(k):
    if isinstance(k, (tuple, list, dict)):
        return json.dumps(k)
    else:
        return k


class AIOPool(object):
    @classmethod
    async def get_pool(cls, db_setting, pool_size, loop):
        aio_pool_ins = cls()
        pool = await cls.create_aio_pool(db_setting, loop, pool_size)
        setattr(aio_pool_ins, "pool", pool)
        server_status = await aio_pool_ins.get_server_status()
        setattr(aio_pool_ins, "server_status", server_status)
        return aio_pool_ins

    @staticmethod
    async def create_aio_pool(db_setting, loop, pool_size):
        '''
        Please note that you need to manually call commit() bound to your Connection object,
        because by default it’s set to False or in aiomysql.connect()
        you can transfer addition keyword argument autocommit=True.
        '''
        pool = await aiomysql.create_pool(maxsize=pool_size,
                                          host=db_setting['host'],
                                          port=db_setting['port'],
                                          user=db_setting['user'],
                                          password=db_setting['passwd'],
                                          db=db_setting['db'],
                                          cursorclass=db_setting['cursorclass'],
                                          autocommit=db_setting['autocommit'],
                                          echo=IS_DEBUG,
                                          loop=loop)
        return pool

    @async_time_consumer
    async def execute(self, query, params=None):
        """Execute query in pool.

        Returns future yielding closed cursor.
        You can get rows, lastrowid, etc from the cursor.

        :return: Future of cursor
        :rtype: Future
        """
        async with self.pool.acquire() as conn:
            cur = await conn.cursor()
            await cur.execute(query, params)
            await cur.close()
            return cur

    @async_time_consumer
    async def execute_many(self, stmt, params=None, is_debug=IS_DEBUG_DEFAULT):
        if is_debug:
            for param in params:
                sql = self.sql_render(stmt, param)
                logging.info('try stmt sql=%s', sql)
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                affected_count = await cur.executemany(stmt, params)
                return affected_count

    @async_time_consumer
    async def querymany(self, stmt, params=None, is_debug=IS_DEBUG_DEFAULT):
        if is_debug:
            sql = self.sql_render(stmt, params)
            logging.info('try querymany sql=%s', sql)

        rs = []
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(stmt, params)
                rs.append(await cur.fetchall())
                while (await cur.nextset()):
                    rs.append(await cur.fetchall())
        return rs

    @async_time_consumer
    async def insert_form_fields(self, table, fields):
        sql = 'INSERT INTO %s SET ' % table
        keys = fields.keys()
        vals = [JSONIZE(fields[k]) for k in keys]
        sql = sql + ",".join(["`" + k + "`=%s" for k in keys])
        print(f"sql={sql}")

        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(sql, vals)
                if cur.rowcount != 1:
                    logging.error(f'insert affected_rowcount={cur.rowcount}')
                    raise CommonException(STATUS_INSERT_DB_FAILED)
                return cur.lastrowid

    @async_time_consumer
    async def update_form_fields(self, table, fields, where=None):
        sql = "UPDATE %s SET " % table
        kr = fields.keys()
        vr = [JSONIZE(fields[k]) for k in kr]

        kw = []
        vw = []
        if isinstance(where, dict):
            kw = where.keys()
            # kr.extend(kw)
            vw = [where[k] for k in kw]
            vr.extend(vw)
            wherek = " AND ".join(["`" + k + "`=%s" for k in kw])
        elif isinstance(where, str):
            wherek = where
        else:
            wherek = "1>0"
        sqlk = ",".join([k + "=%s" for k in kr])
        sql += sqlk + " WHERE " + wherek

        print(f"update_form_fields sql={sql}")
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(sql, vr)
                if cur.rowcount != 1:
                    logging.error(f'update affected_rowcount={cur.rowcount}')
                    raise CommonException(STATUS_INSERT_DB_FAILED)
                return cur.lastrowid

    @async_time_consumer
    async def insert_dup_update_form_fields(self, table, fields):
        sql = 'INSERT INTO %s SET ' % table
        keys = fields.keys()
        vals = [JSONIZE(fields[k]) for k in keys]
        sql = sql + ",".join(["`" + k + "`=%s" for k in keys])

        sql += " ON DUPLICATE KEY UPDATE " + ",".join(["`" + k + "`=%s" for k in keys])
        vals *= 2

        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                return cur.lastrowid

    @async_time_consumer
    async def insert(self, stmt, params=None, is_debug=IS_DEBUG_DEFAULT):
        if is_debug:
            sql = self.sql_render(stmt, params)
            print(f"todo-debug sql={sql}")
            logging.info('try to insert sql=%s', sql)

        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(stmt, params)
                if cur.rowcount != 1:
                    logging.error(f'insert affected_rowcount={cur.rowcount}')
                    raise CommonException(STATUS_INSERT_DB_FAILED)
                return cur.lastrowid

    @async_time_consumer
    async def insert_many(self, stmt, params=None, is_debug=IS_DEBUG_DEFAULT):
        if is_debug:
            for param in params:
                sql = self.sql_render(stmt, param)
                logging.info('try stmt sql=%s', sql)

        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                affected_count = await cur.executemany(stmt, params)
                return affected_count

    @async_time_consumer
    async def save_with_transaction(self, query, params=None, is_debug=IS_DEBUG_DEFAULT):
        # return affected_count list
        if is_debug:
            sql = self.sql_render(query, params)
            logging.info('try to save_with_transaction sql=%s', sql)

        txn = await self.begin()
        try:
            cur = await txn.execute(query, params)
            rs = await self.fetchall_result(cur)
            await txn.commit()
            logging.info(f"save_with_transaction success rs={rs}, sql={cur._executed}")
            return rs
        except Exception as ex:
            await txn.rollback()
            logging.error("rollback save_with_transaction exception=%s" % str(ex))
            raise ex

    async def fetchall_result(self, cursor):
        # return result list
        rs = []
        rows = await cursor.fetchall()
        rs.append(rows)
        while (await cursor.nextset()):
            rows = await cursor.fetchall()
            rs.append(rows)
        return rs

    def sql_render(self, query, params):
        return query % self.esc_args(params) if params else query

    def sql_render_many(self, query, params):
        # executemany
        pass

    def esc_args(self, args):
        """
        Get the code from Connection class
        """
        if isinstance(args, (tuple, list)):
            return tuple(self.escape(arg) for arg in args)
        elif isinstance(args, dict):
            return dict((key, self.escape(val)) for (key, val) in args.items())
        else:
            # If it's not a dictionary let's try escaping it anyways.
            # Worst case it will throw a Value error
            return self.escape(args)

    def escape(self, obj):
        """ Escape whatever value you pass to it"""
        if isinstance(obj, str):
            return "'" + self.escape_string(obj) + "'"
        if isinstance(obj, bytes):
            return escape_bytes_prefixed(obj)
        return escape_item(obj, self.charset)

    def escape_string(self, s):
        if (self.server_status &
                SERVER_STATUS.SERVER_STATUS_NO_BACKSLASH_ESCAPES):
            return s.replace("'", "''")
        return converters.escape_string(s)

    @async_time_consumer
    async def get_server_status(self):
        async with self.pool.acquire() as conn:
            self.charset = conn._charset
            return conn.server_status

    async def _get_conn(self):
        #     conn = yield from pool.acquire()
        #     try:
        #         <block>
        #     finally:
        #         conn.release()
        return await self.pool.acquire()

    async def _put_conn(self, conn):
        await self.pool.release(conn)

    def _close_conn(self, conn):
        conn.close()

    async def begin(self):
        """Start transaction

        Wait to get connection and returns `Transaction` object.

        :return: Future[Transaction]
        :rtype: Future
        """
        conn = await self._get_conn()
        try:
            await conn.begin()
        except:
            self._close_conn(conn)
            raise
        return Transaction(self, conn)

    def run_sync(self, future):
        return self.loop.run_until_complete(future)


class Transaction(object):
    """Represents transaction in pool"""

    def __init__(self, pool, conn):
        self._pool = pool
        self._conn = conn

    def _ensure_conn(self):
        if self._conn is None:
            raise Exception("Transaction is closed already")

    async def _close(self):
        if hasattr(self, "_cur"):
            await self._cur.close()
        await self._pool._put_conn(self._conn)
        self._pool = self._conn = self._cur = None

    @async_time_consumer
    async def insert_form_fields(self, table, fields):
        sql = 'INSERT INTO %s SET ' % table
        keys = fields.keys()
        vals = [JSONIZE(fields[k]) for k in keys]
        sql = sql + ",".join(["`" + k + "`=%s" for k in keys])

        self._ensure_conn()
        if not hasattr(self, "_cur"):
            self._cur = await self._conn.cursor()  # self.cur is _ContextManager(fut)
        await self._cur.execute(sql, vals)
        return self._cur

    def __del__(self):
        if self._pool is not None:
            logging.warn("Transaction has not committed or rollbacked.")
            self._pool._close_conn(self._conn)
