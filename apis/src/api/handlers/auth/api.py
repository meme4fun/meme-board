from fastapi import APIRouter

from api.handlers.auth import auth_handler

router = APIRouter()
public_router = APIRouter()
private_router = APIRouter()

public_router.include_router(auth_handler.public_router, prefix="/auth")
private_router.include_router(auth_handler.private_router, prefix="/auth")

