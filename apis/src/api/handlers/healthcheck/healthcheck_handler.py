# -*- coding: utf-8 -*-
from loguru import logger
from fastapi import APIRouter, Depends

from base.status_code import STATUS_SUCCESS
from models.rsp_schemas.common import CommonResponse

router = APIRouter()


@router.get("/healthcheck", name="healthcheck", tags=["HealthCheck"])
async def health_check():
    return CommonResponse.msg_format(status=STATUS_SUCCESS)
