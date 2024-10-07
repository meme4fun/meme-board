import cProfile
import os
import sys
from argparse import ArgumentParser

import uvicorn as uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from loguru import logger
from starlette.exceptions import HTTPException
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
os.environ.clear()
load_dotenv()

from api.errors.common_error import common_error_handler, unknown_error_handler
from api.errors.http_error import http_error_handler
from api.errors.validation_error import http422_error_handler
from api.routes import router, private_router, public_router
from common.common_exception import CommonException
from config.env_config import IS_DEBUG, DOCS_URL, FAST_API_TITLE, FAST_API_VERSION, NEED_CORS, CORS_ALLOW_ORIGIN, \
    SERVER_PORT, LOG_DIR, OPENAPI_URL
from config.events import create_start_app_handler, create_stop_app_handler
from config.logging import configure_logging
from common.utils import log_config


def get_server_name():
    normpath = os.path.normpath(sys.argv[0])
    dir_name, file_name = os.path.split(normpath)
    server_name, _ = os.path.splitext(file_name)
    return server_name


def get_server_params():
    parser = ArgumentParser()
    parser.add_argument("--port", default=SERVER_PORT, help=f"--port {SERVER_PORT}")
    parser.add_argument("--p", default=0, type=int, help="--p 1")
    args = parser.parse_args()
    port = args.port
    is_profile = True if str(args.p).upper() in ("TRUE", "1") else False
    return port, is_profile


# def get_is_profile():
#     parser = ArgumentParser()
#     parser.add_argument("--p", default=0, help=f"--p 1")
#     args = parser.parse_args()
#     is_profile = args.p
#     is_profile = True if str(is_profile).upper() in ("TRUE", "1") else False
#     return is_profile


def get_application() -> FastAPI:
    log_filename = f'{get_server_name()}_{get_server_params()[0]}.log'
    configure_logging(log_dir=LOG_DIR, filename=log_filename)
    log_config(log_dir=LOG_DIR, filename=log_filename, is_debug=IS_DEBUG)
    application = FastAPI(**{
        "debug": IS_DEBUG,
        "docs_url": DOCS_URL,
        "openapi_url": OPENAPI_URL,
        "redoc_url": None,
        "title": FAST_API_TITLE,
        "version": FAST_API_VERSION,
        "api_prifix": "/api",
    })

    if NEED_CORS:
        application.add_middleware(
            CORSMiddleware,
            allow_origins=CORS_ALLOW_ORIGIN,
            allow_credentials=True,
            allow_methods=["GET", "POST", "OPTIONS", "PATCH", "PUT"],
            allow_headers=["x-requested-with", "content-type"],
        )

    application.add_event_handler(
        "startup",
        create_start_app_handler(application),
    )
    application.add_event_handler(
        "shutdown",
        create_stop_app_handler(application),
    )

    application.add_exception_handler(RequestValidationError, http422_error_handler)
    application.add_exception_handler(CommonException, common_error_handler)
    application.add_exception_handler(HTTPException, http_error_handler)
    application.add_exception_handler(Exception, unknown_error_handler)

    application.include_router(router)
    application.include_router(private_router, prefix="/api")
    application.include_router(public_router, prefix="/api")
    for route in application.routes:
        logger.info(route)
    return application


app = get_application()

if __name__ == "__main__":
    server_name = get_server_name()
    port, is_profile = get_server_params()

    need_auto_reload = True if IS_DEBUG else False
    uvicorn.run(f"{server_name}:app", host="0.0.0.0", port=int(port), log_level="info", reload=need_auto_reload, workers=3)
