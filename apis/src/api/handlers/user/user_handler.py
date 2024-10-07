# -*- coding: utf-8 -*-

from fastapi import APIRouter, Depends

from api.dependencies.authentication import get_current_user
from caches.user_cache import get_userCacheIns, UserCache
from caches.social_cache import get_socialCacheIns, SocialCache
from base.status_code import STATUS_SUCCESS
from models.domain.user import UserSession
from models.rsp_schemas.user_resp_model import UserMetadataResp
from models.rsp_schemas.common import CommonResponse

public_router = APIRouter()
private_router = APIRouter()


@private_router.post("/metadata", tags=["User"])
async def user_metadata(
    cur_user: UserSession = Depends(get_current_user),
    user_cache: UserCache = Depends(get_userCacheIns),
) -> UserMetadataResp:
    user_info = await user_cache.get_user_by_address(cur_user.address)
    inviter_id = user_info["inviter"]
    if inviter_id:
        user = await user_cache.get_user_by_user_id(inviter_id)
        inviter_address = user["address"]
        bound_invite_code = user["invite_code"]
    else:
        inviter_address = None
        bound_invite_code = None

    data = {
            "inviter_address": inviter_address,
            "bound_invite_code": bound_invite_code,
            "invite_code": user_info["invite_code"],
        }
    return UserMetadataResp.msg_format(status=STATUS_SUCCESS, data=data)
