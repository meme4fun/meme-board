
import asyncio
import logging
import aiohttp

from common.singleton import Singleton
from common.utils import async_time_consumer, run_sync
from urllib.request import getproxies
from config.env_config import USE_PROXY


class HttpClient(metaclass=Singleton):

    def __init__(self, url=None, conn_timeout_sec=30, read_timeout_sec=30, is_use_proxy=False):
        self.url = url
        self.is_use_proxy = is_use_proxy
        self.conn_timeout_sec = conn_timeout_sec
        self.read_timeout_sec = read_timeout_sec

    async def initialize(self):
        self.session = aiohttp.ClientSession(conn_timeout=self.conn_timeout_sec,
                                             read_timeout=self.read_timeout_sec)

    def get_local_proxy(self):
        if USE_PROXY or self.is_use_proxy:
            proxy = getproxies()['http']
            return proxy
        else:
            return None

    @async_time_consumer
    async def get(self, url, headers=None, return_json=True, **kwargs):
        async with self.session.get(url, headers=headers, proxy=self.get_local_proxy(), **kwargs) as response:
            try:
                return await response.json(content_type=None)
            except Exception as ex:
                logging.exception(ex)
                print(f"response={await response.text()}")

    @async_time_consumer
    async def download(self, url, **kwargs):
        async with self.session.get(url, proxy=self.get_local_proxy(), **kwargs) as response:
            try:
                content = await response.read()
                status_code = response.status
                content_type = response.headers.get('Content-Type')
                return {
                    "content": content,
                    "status_code": status_code,
                    "content_type": content_type
                }
            except Exception as ex:
                logging.exception(ex)
                print(f"download: url={url}, status={response.status}")
                return None

    @async_time_consumer
    async def post(self, url, json=None, data=None, headers=None) -> dict:
        async with self.session.post(url, json=json, data=data, headers=headers) as response:
            try:
                return await response.json(content_type=None)
            except Exception as ex:
                logging.exception(ex)
                print(f"response={await response.text()}")

    async def close(self):
        if self.session:
            await self.session.close()
        self.session = None

    def get_session(self):
        return self.session


httpClientIns = None


async def main():
    url = "http://localhost:5000"


if __name__ == "__main__":
    pass
