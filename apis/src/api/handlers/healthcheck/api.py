from fastapi import APIRouter
from api.handlers.healthcheck import healthcheck_handler

router = APIRouter()
public_router = APIRouter()
private_router = APIRouter()

router.include_router(healthcheck_handler.router, prefix="")


