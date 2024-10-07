
import http
import logging
import json
import traceback
from typing import Any, Optional, Awaitable
import tornado
import tornado.escape
from tornado import httputil
from tornado.web import RequestHandler, HTTPError

from base.status_code import STATUS_ERROR, CONTENT_TYPE, STATUS_UNKNOWN, STATUS_SUCCESS, STATUS_MSG_MAP
from common.common_exception import CommonException
from common.utils import CommonEncoder
from config import env_config
from config.env_config import IS_DEBUG, ENV_DEV
from config.git_config import CUR_ENV

if CUR_ENV == ENV_DEV:
    pass


class ApiBaseHandler(RequestHandler):
    """
    1, subclass set status and data,
    2, call write_resp
    """
    def __init__(self, application: "Application", request: httputil.HTTPServerRequest) -> None:
        super(ApiBaseHandler, self).__init__(application, request)
        self._logging = logging.getLogger(self.__class__.__name__)
        self.req_json = None
        self.status = STATUS_ERROR
        self.message = None
        self.data = None

    def set_default_headers(self):
        self._set_default_headers()
        if env_config.NEED_CORS:
            self._set_addition_cors_headers()

    def _set_default_headers(self):
        pass

    def _set_addition_cors_headers(self):
        CORS_ALLOW_ORIGIN = env_config.CORS_ALLOW_ORIGIN
        self.set_header("Access-Control-Allow-Origin", CORS_ALLOW_ORIGIN)
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Headers", "content-type")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH, PUT')
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def data_received(self, chunk: bytes) -> Optional[Awaitable[None]]:
        pass

    def msg_format(self, status, data=None):
        msg = self.message if self.message else STATUS_MSG_MAP.get(status, '')
        temp = {'status': status,
                'msg': msg
                }

        if data or data == []:
            temp['data'] = data

        if not msg:
            logging.warning('msg_format msg is not define temp=%s', temp)

        return temp

    def data_format(self, result):
        return {"result": result}

    def write_pure_json(self, content):
        self.set_header("Content-Type", CONTENT_TYPE)
        self.finish(json.dumps(content, cls=CommonEncoder))

    def write_resp(self):
        resp = self.msg_format(self.status, self.data)
        resp_str = json.dumps(resp, cls=CommonEncoder)
        self.set_header("Content-Type", CONTENT_TYPE)
        self.finish(resp_str)

    def write_html(self, html):
        self.set_header("Content-Type", "text/html")
        self.finish(html)

    def write_error(self, status_code: int, **kwargs: Any):
        if "exc_info" in kwargs:
            ex_type, ex, trace_back = kwargs["exc_info"]
            if isinstance(ex, CommonException):
                self.status = ex.status
                self.message = ex.message
                self.set_status(http.HTTPStatus.OK)
                self.write_resp()
                return
            elif not isinstance(ex, HTTPError):
                # server internal error
                self.status = STATUS_UNKNOWN
                self.set_status(http.HTTPStatus.OK)
                self.write_resp()
                return

            if IS_DEBUG and isinstance(ex, HTTPError):
                data = ""
                for line in traceback.format_exception(*kwargs["exc_info"]):
                    data = data + line
                self.data = data

        self.set_status(ex.status_code)
        self.status = status_code
        self.message = self._reason
        self.write_resp()

    def options(self):
        # support cors
        self.status = STATUS_SUCCESS
        self.write_resp()

    def get_req_json(self):
        if self.req_json is not None:
            return self.req_json
        else:
            if self.request.body:
                self.req_json = tornado.escape.json_decode(self.request.body)
            else:
                self.req_json = {}
            return self.req_json

    def get_body_params(self) -> dict:
        self.get_req_json()
        if hasattr(self, 'user_id'):
            self.req_json['user_id'] = self.user_id
        return self.req_json

