# -*- coding: utf-8 -*-


from base.status_code import STATUS_MSG_MAP, STATUS_ILLEGAL_PARAMETER


class CommonException(Exception):
    def __init__(self, status, message=None):
        self.status = status
        self.message = message if message else STATUS_MSG_MAP[self.status]

    def __str__(self):
        return f"status={self.status}, err_msg={self.message}"


class IllegalParamException(CommonException):
    def __init__(self, message=None):
        self.status = STATUS_ILLEGAL_PARAMETER
        self.message = message if message else STATUS_MSG_MAP[STATUS_ILLEGAL_PARAMETER]
