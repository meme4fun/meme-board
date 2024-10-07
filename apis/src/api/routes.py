from fastapi import APIRouter

from api.handlers.healthcheck import api as healthcheck
from api.handlers.auth import api as auth
from api.handlers.user import api as user
from api.handlers.faucet import api as faucet


def get_private_router():
    router = APIRouter()
    router.include_router(healthcheck.private_router, prefix="/private")
    router.include_router(auth.private_router, prefix="/private")
    router.include_router(user.private_router, prefix="/private")
    router.include_router(faucet.private_router, prefix="/private")
    return router


def get_public_router():
    router = APIRouter()
    router.include_router(healthcheck.public_router, prefix="/public")
    router.include_router(auth.public_router, prefix="/public")
    router.include_router(user.public_router, prefix="/public")
    router.include_router(faucet.public_router, prefix="/public")
    return router


def get_router():
    router = APIRouter()
    router.include_router(healthcheck.router, prefix="")
    router.include_router(auth.router, prefix="")
    router.include_router(user.router, prefix="")
    router.include_router(faucet.router, prefix="")
    return router


private_router = get_private_router()
public_router = get_public_router()
router = get_router()
