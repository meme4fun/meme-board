from tenacity import stop_after_attempt, wait_fixed, retry, retry_if_exception_type

from common.http_client import HttpClient
from common.singleton import Singleton


class BinanceClient(HttpClient):
    API_HOST = "https://api.binance.com"

    def build_url(self, path):
        return f"{self.API_HOST}{path}"

    async def get_coin_price(self, symbol):
        """
        获取最新币价
        :param symbol: eg:ETHUSDT
        :return:
        """
        path = f"/api/v3/ticker/price?symbol={symbol}"
        url = self.build_url(path)
        resp = await self.get(url)
        return resp


binanceClientIns = None


async def get_binanceClientIns():
    global binanceClientIns
    if binanceClientIns:
        return binanceClientIns
    else:
        ins = BinanceClient()
        await ins.initialize()
        binanceClientIns = ins
        return ins


