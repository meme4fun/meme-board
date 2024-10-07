from fastapi import APIRouter

from api.handlers.user import user_handler

router = APIRouter()
public_router = APIRouter()
private_router = APIRouter()

public_router.include_router(user_handler.public_router, prefix="/user")
private_router.include_router(user_handler.private_router, prefix="/user")

