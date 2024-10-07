# -*- coding: utf-8 -*-

CONTENT_TYPE = 'application/json; charset=UTF-8'
api_version = 1.0

STATUS_UNKNOWN = -1
STATUS_SUCCESS = 0
STATUS_ERROR = 1

STATUS_MSG_MAP = {
    STATUS_SUCCESS: 'ok',
    STATUS_UNKNOWN: 'unknown error',
    STATUS_ERROR: 'error',
}
