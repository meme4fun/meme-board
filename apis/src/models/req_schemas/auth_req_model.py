from pydantic import Field

from models.base import FunModel


class AuthChallengeParam(FunModel):
    address: str = Field(..., description="")


class AuthSignInParam(FunModel):
    inviter: str | None = Field(None, description="")
    message: str = Field(..., description="")
    signature: str = Field(..., description="")


class AuthReBindParam(FunModel):
    inviter: str = Field(None, description="")