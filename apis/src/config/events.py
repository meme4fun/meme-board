import asyncio
from typing import Callable

from fastapi import FastAPI
from loguru import logger
from starlette.requests import Request
from datasource.ds_factory import DBDataSource


def create_start_app_handler(app: FastAPI) -> Callable:
    async def async_init():
        logger.info(f"start app...")
        loop = asyncio.get_event_loop()
        await DBDataSource.init_pool(loop)
    return async_init


def create_stop_app_handler(app: FastAPI) -> Callable:
    # @logger.catch
    def foo():
        logger.info(f"stop app...")
    return foo

