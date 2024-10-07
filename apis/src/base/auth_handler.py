# -*- coding: utf-8 -*-
from tornado import httputil
from common.req_limit import ReqLimit
from base.status_code import STATUS_SUCCESS
from base.account_auth import AccountAuth


class AuthHandler(AccountAuth):

    def __init__(self, application: "Application", request: httputil.HTTPServerRequest) -> None:
        super(AuthHandler, self).__init__(application, request)

    async def prepare(self):
        if self.request.method == 'OPTIONS':
            return

        await self.check_auth()
        await ReqLimit.check_req_limit(
            self.user_id, ReqLimit.GATE_GLOBAL_KEY, ReqLimit.GATE_INTERVAL_SEC,
            ReqLimit.GATE_REQ_LIMIT)

        result = self.sub_prepare()
        if result is not None:
            await result

    async def sub_prepare(self):
        """sub this to add prepare"""
        pass


class TestAuthHandler(AuthHandler):

    def post(self):
        self.status = STATUS_SUCCESS
        self.data = {'auth': 'pass',
                     'source': self.source,
                     }
        self.write_resp()
