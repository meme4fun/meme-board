from typing import Union

from fastapi import HTTPException
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from starlette.requests import Request
from starlette.responses import JSONResponse

from base.status_code import STATUS_ILLEGAL_PARAMETER


async def http422_error_handler(_: Request, exc: Union[RequestValidationError, ValidationError]) -> JSONResponse:
    return JSONResponse({"status": STATUS_ILLEGAL_PARAMETER, "msg": exc.errors()})
