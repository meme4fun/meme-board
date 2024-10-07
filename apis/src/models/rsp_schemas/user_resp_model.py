from pydantic import Field

from models.base import FunModel
from models.rsp_schemas.common import CommonResponse


class UserMetadata(FunModel):
    inviter_address: str | None = Field(..., description="")
    bound_invite_code: str | None = Field(..., description="")
    invite_code: str = Field(..., description="")


class UserMetadataResp(CommonResponse):
    data: UserMetadata
