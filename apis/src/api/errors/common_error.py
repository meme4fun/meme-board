from loguru import logger
from starlette.requests import Request
from starlette.responses import JSONResponse

from base.status_code import STATUS_MSG_MAP, STATUS_ERROR
from common.common_exception import CommonException
from config.env_config import IS_DEBUG


async def common_error_handler(_: Request, exc: CommonException) -> JSONResponse:
    logger.exception(exc) if IS_DEBUG else logger.info(exc)
    return JSONResponse({"status": exc.status, "msg": exc.message})


async def unknown_error_handler(_: Request, exc: Exception) -> JSONResponse:
    logger.exception(exc)
    return JSONResponse({"status": STATUS_ERROR, "msg": STATUS_MSG_MAP[STATUS_ERROR]})
