#!/usr/bin/env python
import asyncio
import logging
import random
import sys
from asyncio.exceptions import TimeoutError

from aiohttp import ServerTimeoutError

from const.env_const import ENV_PROD

sys.path.insert(0, "../../")
from common.http_client import HttpClient
from common.utils import run_sync_clean, get_cur_time_ms
from config.git_config import CUR_ENV


def retry(max_retries=5, sleep=20):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            retries = 0
            while retries < max_retries:
                try:
                    response = await func(*args, **kwargs)
                except (ServerTimeoutError, TimeoutError):
                    response = None

                if isinstance(response, dict) and 'Rate limit exceeded' not in response.get("message", ""):
                    return response
                retries += 1
                logging.info(f"[moralis retry] response={response} retrying... loop={retries}")
                await asyncio.sleep(sleep * retries)
            return response

        return wrapper

    return decorator


class CMCClient(HttpClient):
    BASE_URL = "https://pro-api.coinmarketcap.com"
    API_URL = "https://api.coinmarketcap.com"
    if CUR_ENV == ENV_PROD:
        API_KEY_LIST = [
        ]
    else:
        API_KEY_LIST = [
        ]

    def __init__(self):
        super(CMCClient, self).__init__()
        self.semaphore = asyncio.Semaphore(4 * len(self.API_KEY_LIST))

    def build_url(self, path, url):
        return f"{url}{path}"

    @property
    def headers(self):
        headers = {
            "Accept": "application/json",
            "X-CMC_PRO_API_KEY": random.choice(self.API_KEY_LIST)
        }
        return headers

    @retry(3, sleep=3)
    async def _get(self, path, params=None, url=BASE_URL):
        url = self.build_url(path, url)
        logging.info(f"url:{url} headers={self.headers} params={params or None}")
        return await self.get(url, headers=self.headers, params=params or None)

    async def get_quotes_latest(self, cmc_id):
        """
            api link:
                https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
        """
        path = f"/v2/cryptocurrency/quotes/latest?id={cmc_id}"
        return await self._get(path)

    async def get_listing_latest(self, start=1, limit=5000):
        """
            api link:
                https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
        """
        path = f"/v1/cryptocurrency/listings/latest?start={start}&limit={limit}"
        return await self._get(path)

    async def get_metadata(self, _id=None, slug=None, symbol=None, address=None, aux="date_added"):
        """
            api link:
                https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyInfo
        """
        path = f"/v2/cryptocurrency/info"
        params = {}

        if _id:
            params["id"] = _id

        if slug:
            params["slug"] = slug

        if symbol:
            params["symbol"] = symbol

        if address:
            params["address"] = address

        if aux:
            params["aux"] = aux
        return await self._get(path, params=params)

    async def get_dex_token_price(self, network, token_address):
        """
            直接爬虫方式获取，页面抓取到获取价格api
        """
        path = f"/dexer/v3/dexer/pair-info"
        params = {
            "dexer-platform-name": network,
            "address": token_address,
            "t": get_cur_time_ms()
        }
        return await self._get(path, params=params, url=self.API_URL)


cmcClientIns = None


async def get_cmcClientIns():
    global cmcClientIns
    if cmcClientIns:
        return cmcClientIns
    else:
        ins = CMCClient()
        await ins.initialize()
        cmcClientIns = ins
    return ins


async def run_test():
    print(asyncio.get_event_loop())
    ins = await get_cmcClientIns()
    # data = await ins.get_quotes_latest("1,2")
    # data = await ins.get_listing_latest()
    # print(data)
    data = await ins.get_dex_token_price("arbitrum", "0xe68f0ff506d5ed6a1cb7b74b564aa94a28409d76")
    print(data)


if __name__ == '__main__':
    run_sync_clean(run_test(), loop=asyncio.new_event_loop())
