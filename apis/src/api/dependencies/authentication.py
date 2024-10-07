from starlette.requests import Request

from base.account_auth import AccountAuth
from common.req_limit import ReqLimit
from models.domain.user import UserSession


async def get_current_user(request: Request):
    auth = AccountAuth(request)
    await auth.initialize()
    await auth.check_auth()
    user = auth.current_user
    await ReqLimit.check_req_limit(
        user.user_id, ReqLimit.GATE_GLOBAL_KEY, ReqLimit.GATE_INTERVAL_SEC,
        ReqLimit.GATE_REQ_LIMIT)
    return UserSession(user_id=user.user_id, address=user.address, source=user.source)


async def get_account_auth(request: Request):
    auth = AccountAuth(request)
    await auth.initialize()
    return auth
