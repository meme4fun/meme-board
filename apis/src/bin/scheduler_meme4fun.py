# -*- coding: utf-8 -*-
import asyncio
import logging
import os
import sys

sys.path.append('../')

from apscheduler.events import EVENT_JOB_ERROR
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from common.gracefull_killer import SchedulerKiller, wait_for_jobs
from common.singleton import Singleton
from common.utils import log_config
from config.env_config import LOG_DIR, IS_DEBUG
from third_party.feishu.feishu_robot import lark_alert
from services.chain_events_service import get_syncMeme4FunEventsServiceIns


async def error_listener(ev):
    ex = ev.exception
    if isinstance(ex, ValueError) and ex.args:
        err = ex.args[0]
        if isinstance(err, dict) and err["code"] == -32603 and err["message"] == 'request failed or timed out':
            pass
        if isinstance(err, dict) and err["code"] == -32000 and err["message"] == 'cannot query unfinalized data':
            pass
        else:
            await lark_alert(title="ChainEventsSchedulerManager", content=ev.traceback)
    else:
        await lark_alert(title="ChainEventsSchedulerManager", content=ev.traceback)


class ChainEventsSchedulerManager(metaclass=Singleton):
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self.killer = SchedulerKiller()

    def initialize(self):
        self.scheduler.add_job(self.chainEventsServiceIns.sync_meme4fun_events_process, "interval", seconds=2)
        self.scheduler.add_listener(lambda event: asyncio.ensure_future(error_listener(event)), EVENT_JOB_ERROR)
        self.scheduler.start()
        self.scheduler.print_jobs()

    async def run_forever(self):
        self.chainEventsServiceIns = await get_syncMeme4FunEventsServiceIns()
        self.initialize()


if __name__ == '__main__':
    server_name, _ = os.path.splitext(sys.argv[0])
    log_filename = server_name + '.log'
    log_dir = os.path.join(LOG_DIR, server_name)
    log_config(log_dir=log_dir, filename=log_filename, is_debug=IS_DEBUG)

    logging.info(f'{server_name} starting... ')

    schedulerSrv = ChainEventsSchedulerManager()
    asyncio.run(schedulerSrv.run_forever())
