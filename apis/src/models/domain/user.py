from models.base import FunModel


class UserSession(FunModel):
    user_id: int
    address: str
    source: str

