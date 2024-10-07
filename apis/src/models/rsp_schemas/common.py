import logging
from typing import Union, List

from models.base import FunModel
from base.status_code import STATUS_MSG_MAP


class CommonResponse(FunModel):
    status: int
    msg: str
    data: Union[dict, list, None]

    @classmethod
    def msg_format(cls, status, message=None, data=None):
        msg = message if message else STATUS_MSG_MAP.get(status, '')
        return cls(status=status, msg=msg, data=data)
