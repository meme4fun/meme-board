# -*- coding: utf-8 -*-
from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from eth_account import messages
from eth_utils import to_checksum_address
from starlette.exceptions import HTTPException
from web3 import Web3
from web3.auto import w3
from loguru import logger

from api.dependencies.authentication import get_account_auth, get_current_user
from base.account_auth import AccountAuth
from components.redis_db.redis_util import get_redisUtilIns
from base.status_code import STATUS_SUCCESS, STATUS_INVALID_SIGNATURE, STATUS_DISCORD_ACCOUNT_BIND_FAILED
from common.common_exception import CommonException, IllegalParamException
from const.env_const import LOGIN_WELCOME_MESSAGE

from models.domain.user import UserSession
from models.rsp_schemas.auth_resp_model import AuthChallenge, AuthChallengeResp, AccessToken, AuthSignInResp
from models.rsp_schemas.common import CommonResponse
from services.account_service import get_accountServiceIns, AccountService
from models.req_schemas.auth_req_model import AuthChallengeParam, AuthSignInParam, AuthReBindParam

public_router = APIRouter()
private_router = APIRouter()


def recover_sign(nonce, signature):
    message_hash = messages.encode_defunct(text=nonce)
    address = w3.eth.account.recover_message(message_hash, signature=signature)
    return address


def parse_message(message):
    try:
        segs = message.split("\n\n")
        welcome_message = segs[0].strip()
        address = segs[1].split(":")[1].strip()
        challenge = segs[2].split(":")[1].strip()
    except Exception as ex:
        raise CommonException(STATUS_INVALID_SIGNATURE)
    return welcome_message, address, challenge


@public_router.post("/signin", tags=["Auth"])
async def signin(
        auth_signin_param: AuthSignInParam,
        account_auth: AccountAuth = Depends(get_account_auth),
        account_service: AccountService = Depends(get_accountServiceIns)
) -> AuthSignInResp:
    inviter_code = auth_signin_param.inviter
    message = auth_signin_param.message
    signature = auth_signin_param.signature
    logger.info(f"{signin.__name__} auth_signin_param={auth_signin_param}")

    welcome_message, address, challenge = parse_message(message)
    if not Web3.is_address(address):
        raise IllegalParamException(f"Invalid param address:{address}")

    try:
        signer_address = to_checksum_address(recover_sign(message, signature))
        assert signer_address == address
    except Exception as ex:
        raise CommonException(STATUS_INVALID_SIGNATURE)

    user_data, user_id = await account_service.register_user_if_not_exist(address, inviter_code)
    access_token = await account_auth.create_session(user_id, address)
    user_data["access_token"] = access_token
    data = AccessToken(**user_data)
    return AuthSignInResp.msg_format(status=STATUS_SUCCESS, data=data)


@private_router.post("/logout", name="", tags=["Auth"])
async def sign_out(
        account_auth: AccountAuth = Depends(get_account_auth)
) -> CommonResponse:
    await account_auth.destroy_session()
    return CommonResponse.msg_format(status=STATUS_SUCCESS)
