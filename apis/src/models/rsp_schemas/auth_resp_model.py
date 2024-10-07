from pydantic import Field

from models.base import FunModel
from models.rsp_schemas.common import CommonResponse



class TwitterCheckBindData(FunModel):
    twitter_name: str | None
    twitter_username: str | None
    twitter_uid: str | None
    twitter_headimage: str | None


class TwitterCheckBindResp(CommonResponse):
    data: TwitterCheckBindData


class TwitterCheckRetweetData(FunModel):
    verified: bool | None


class TwitterCheckRetweetResp(CommonResponse):
    data: TwitterCheckRetweetData


class DiscordCheckJoinData(FunModel):
    verified: bool | None


class DiscordCheckJoinResp(CommonResponse):
    data: DiscordCheckJoinData


class DiscordCallbackData(FunModel):
    err_redirect: str | None


class DiscordCallbackResp(CommonResponse):
    data: DiscordCallbackData
