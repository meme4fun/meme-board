from starlette.exceptions import HTTPException

from base.api_base import ApiBaseHandler
from base.status_code import STATUS_SUCCESS
from common.utils import get_cur_time_ms


class Auth(ApiBaseHandler):
    async def check_auth(self):
        raise HTTPException(401)

    def auth_test(self):
        '''
        '''
        self.status = STATUS_SUCCESS
        self.data = {
                     "auth":   "pass",
                     "source": self.source,
                     "timstamp_ms": get_cur_time_ms()
                     }
        self.write_resp()
