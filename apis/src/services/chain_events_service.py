import sys
import asyncio
import ulid
import re
import pytz
import logging

from common.date_conv import ts_to_date

sys.path.insert(0, "../")

from solana.rpc.async_api import AsyncClient
from solders.pubkey import Pubkey
from solders.signature import Signature
from solana.rpc.commitment import Confirmed
from spl.token.async_client import AsyncToken

from config.network_config import get_solana_network
from const.fun_constant import MEME4FUN_PROGRAM, Tables, SyncTasks, BONDING_CURVE_SEED, FEE_BPS, EventType, LAUNCH_STEPS
from common.singleton import Singleton
from datasource.ds_factory import DBDataSource
from common.common_exception import CommonException
from base.status_code import STATUS_INSERT_DB_FAILED
from common.utils import (
    run_sync_clean,
    async_time_consumer,
    run_task_batch,
)
from common.http_client import HttpClient
from web3_utils.solana_utils import unpack_metadata_account, METAPLEX_PROGRAM_ID, find_metaplx_account_by_mint, \
    parse_solana_logs


class SyncMeme4FunEventsService(Tables, metaclass=Singleton):
    def __init__(self) -> None:
        super(SyncMeme4FunEventsService, self).__init__()
        self.limit = 1000
        self.meme4fun_contract = Pubkey.from_string(MEME4FUN_PROGRAM)
        self.solana_client = AsyncClient(get_solana_network()["web3_host_list"][0])
        self.http_client = HttpClient()

    async def initialize(self):
        loop = asyncio.get_running_loop()
        self.alxPool = await DBDataSource.init_pool(loop)
        await self.init_sync_signature()

    async def select_last_signature(self, task_name, trx=None):
        sql = f"SELECT {self.fun_last_signature_tb_fields}  FROM {self.fun_last_signature_tb} WHERE task_name=%s "
        if trx:
            conn = trx
            sql += " FOR UPDATE "
        else:
            conn = self.alxPool

        cur = await conn.execute(sql, task_name)
        rows = await cur.fetchall() or []
        return rows[0]

    async def init_sync_signature(self):
        for task_name in SyncTasks.keys():
            block_height = await self.select_last_signature(task_name)
            if block_height is None:
                sql = f"""
                    INSERT {self.fun_last_signature_tb}({self.fun_last_signature_tb_fields})
                    VALUES (%s, %s, %s, %s)
                """
                cur = await self.alxPool.execute(sql, [task_name, None, None, None])
                if cur.rowcount != 1:
                    raise CommonException(STATUS_INSERT_DB_FAILED)

    @staticmethod
    def event_type_from_tx(tx):
        return EventType.TokenCreated

    def parse_tx_info(self, tx_sig_info, tx):
        account_keys = tx.value.transaction.transaction.message.account_keys
        event = {
            "signature": tx_sig_info.signature,
            "block_time": tx_sig_info.block_time,
            "slot": tx_sig_info.slot,
            "sender": str(account_keys[0]),
            "mint_account": None,
        }
        event_type = self.event_type_from_tx(tx)
        log_messages = tx.value.transaction.meta.log_messages
        if log_messages:
            logs = parse_solana_logs(log_messages)

        return event_type, event

    async def reset_scan_trace(self, task_name, trx=None):
        sql = f"UPDATE {self.fun_last_signature_tb} SET before_sig=NULL, until_sig=cur_trace_before, cur_trace_before=NULL " \
              f"WHERE task_name=%s"
        cur = await trx.execute(sql, task_name)
        if cur.rowcount != 1:
            raise CommonException(STATUS_INSERT_DB_FAILED)

    async def update_scan_before(self, task_name, signature, trx=None):
        sql = f"UPDATE {self.fun_last_signature_tb} SET before_sig=%s WHERE task_name=%s"
        cur = await trx.execute(sql, (task_name, signature))
        if cur.rowcount != 1:
            raise CommonException(STATUS_INSERT_DB_FAILED)

    async def get_metadata(self, metaplx_account: Pubkey):
        data = (await self.solana_client.get_account_info(metaplx_account)).value.data
        metadata = unpack_metadata_account(data)
        return metadata

    async def build_insert_ticker_param(self, event):
        mint_account = event["mint_account"]
        creator = event["sender"]
        nonce = event["nonce"]
        bounding_curve = event["bounding_curve"]
        reserve_account = event["reserve_account"]
        block_time = event["block_time"]
        tx_signature = event["signature"]

        metaplex_account = find_metaplx_account_by_mint(mint_account)
        metadata = await self.get_metadata(metaplex_account)
        metadata_uri = metadata["data"]["uri"]
        meta = await self.http_client.get(metadata_uri)

        param = {
            "name": meta["name"],
            "ticker": meta["symbol"],
            "desc": meta["description"],
            "image_uri": meta["image"],
            "decimal": None,
            "twitter": meta.get("twitter"),
            "telegram": meta.get("telegram"),
            "website": meta.get("website"),
            "metadata_uri": metadata_uri,
            "is_banned": False,
            "mint_account": mint_account,
            "reserve_account": reserve_account,
            "bonding_curve": bounding_curve,
            "creator": creator,
            "create_ts": block_time,
            "nonce": nonce,
            "create_signature": tx_signature,
            "raydium_pool": None,
            "total_supply": None,
            "market_cap_sol": None,
            "comment_count": None,
            "last_comment_ts": None,
            "price_24h_change": None,
            "price_5min_change": None,
            "volume_24h_sol": None,
            "volume_total_sol": None,
            "fee_bps": FEE_BPS,
            "fee_24h_sol": None,
            "fee_total_sol": None,
        }
        return param

    async def build_order_param(self, event):
        block_time = event["block_time"]
        tx_signature = event["signature"]
        slot = event["slot"]

        param = {
            "side": None,
            "sol_amount": None,
            "token_amount": None,
            "mint_account": None,
            "user_account": event["sender"],
            "trade_ts": block_time,
            "signature": tx_signature,
            "slot": slot,
            "volume_usd": None,
            "fee_sol": None,
        }
        return param

    async def build_update_fee_param(self, event):
        block_time = event["block_time"]
        date_key = ts_to_date(block_time).strftime("%Y%m%d")

        param = {
            "user_account": event["sender"],
            "date_key": date_key,
            "trade_fee_sol": None,
        }
        return param

    def build_insert_launch_steps_params(self, event):
        mint_account = event["mint_account"]

        params = list()
        for step in LAUNCH_STEPS:
            param = {
                "mint_account": mint_account,
                "step": step,
                "slot": None,
                "signature": None,
                "block_time": None,
            }
            params.append(param)
        return params

    async def insert_tickers(self, insert_ticker_params, trx):
        fields_str, values_str = self.build_insert_fields_str(insert_ticker_params[0])
        sql = f"INSERT INTO {self.fun_tickers_tb} ({fields_str}) VALUES ({values_str})"
        cur = await trx.execute_many(sql, insert_ticker_params)
        if cur.rowcount != len(insert_ticker_params):
            raise CommonException(STATUS_INSERT_DB_FAILED)

    async def init_fee_stat_if_not_exist(self, update_fee_params, trx):
        in_query = self.build_in_query(update_fee_params, "user_account", "date_key")
        sql = f"SELECT user_account, date_key FROM {self.fun_user_fee_tb} WHERE (user_account, date_key) IN ({in_query})"
        cur = await trx.execute(sql)
        rows = await cur.fetchall() or []
        existed_keys = set()
        for row in rows:
            existed_keys.add((row["user_account"], row["date_key"]))

        insert_params = list()
        update_params = list()
        for param in update_fee_params:
            if (param["user_account"], param["date_key"]) not in existed_keys:
                insert_params.append(param)
            else:
                update_params.append(param)

        fields_str, values_str = self.build_insert_fields_str(insert_params[0])
        sql = f"INSERT INTO {self.fun_user_fee_tb} ({fields_str}) VALUES ({values_str})"
        cur = await trx.execute_many(sql, insert_params)
        if cur.rowcount != len(insert_params):
            raise CommonException(STATUS_INSERT_DB_FAILED)
        return update_params

    async def update_fee_stat(self, update_fee_params, trx):
        sql = f"UPDATE {self.fun_user_fee_tb} SET trade_fee_sol=trade_fee_sol+%s " \
              f"WHERE user_account=%s AND date_key=%s"
        cur = await trx.execute_many(sql, update_fee_params)
        if cur.rowcount != len(update_fee_params):
            raise CommonException(STATUS_INSERT_DB_FAILED)

    async def insert_launch_steps(self, insert_launch_steps_params, trx):
        fields_str, values_str = self.build_insert_fields_str(insert_launch_steps_params[0])
        sql = f"INSERT INTO {self.fun_ticker_launch_steps_tb} ({fields_str}) VALUES ({values_str})"
        cur = await trx.execute_many(sql, insert_launch_steps_params)
        if cur.rowcount != len(insert_launch_steps_params):
            raise CommonException(STATUS_INSERT_DB_FAILED)

    @async_time_consumer
    async def sync_meme4fun_events_process(self):
        task_name = SyncTasks.MEME4FUN.value
        cur_scan_sig = await self.select_last_signature(task_name)

        before_signature = Signature.from_string(cur_scan_sig["before"]) if cur_scan_sig["before"] else None
        until_signature = Signature.from_string(cur_scan_sig["until"]) if cur_scan_sig["until"] else None

        await self.fetch_address_signatures(task_name, before_signature, until_signature)


syncMeme4FunEventsServiceIns = None


async def get_syncMeme4FunEventsServiceIns():
    global syncMeme4FunEventsServiceIns
    if syncMeme4FunEventsServiceIns:
        return syncMeme4FunEventsServiceIns
    else:
        ins = SyncMeme4FunEventsService()
        await ins.initialize()
        syncMeme4FunEventsServiceIns = ins
    return ins


async def run_service():
    print(asyncio.get_event_loop())
    service = await get_syncMeme4FunEventsServiceIns()
    await service.sync_meme4fun_events_process()


if __name__ == "__main__":
    asyncio.run(run_service())
