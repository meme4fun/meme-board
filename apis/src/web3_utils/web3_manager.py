from random import choice
from tenacity import retry, retry_if_exception_type, stop_after_attempt

from web3 import Web3, AsyncHTTPProvider, HTTPProvider, AsyncWeb3
from web3.eth import AsyncEth
from web3.middleware import async_gas_price_strategy_middleware, async_buffered_gas_estimate_middleware, \
    async_geth_poa_middleware

from common.singleton import Singleton
from config.network_config import get_network_config
from asyncio import TimeoutError


class HTTPProviderPool(HTTPProvider):
    def __init__(self, urls):
        super(HTTPProviderPool, self).__init__()
        self.providers = [HTTPProvider(url) for url in urls]

    def make_request(self, method, params):
        provider = choice(self.providers)
        return provider.make_request(method, params)


def build_async_w3_http(endpoint_uri: str) -> Web3:
    _web3 = Web3(
        AsyncHTTPProvider(endpoint_uri, request_kwargs={"verify_ssl": False}),  # type: ignore
        middlewares=[async_gas_price_strategy_middleware, async_buffered_gas_estimate_middleware],
        modules={"eth": AsyncEth},
    )
    return _web3


def build_w3_list(urls):
    return [Web3(HTTPProvider(url)) for url in urls]


class AsyncHTTPProviderPool(AsyncHTTPProvider):
    def __init__(self, urls, timeout):
        super(AsyncHTTPProviderPool, self).__init__()
        self.providers = [AsyncHTTPProvider(url, request_kwargs={"timeout": timeout}) for url in urls]

    @retry(retry=retry_if_exception_type(TimeoutError), stop=stop_after_attempt(2), reraise=True)
    async def make_request(self, method, params):
        provider = choice(self.providers)
        return await provider.make_request(method, params)


async def build_poa_async_w3_http(chain_name, timeout=3) -> AsyncWeb3:
    return AsyncWeb3(
        AsyncHTTPProviderPool(get_network_config(chain_name=chain_name)["web3_host_list"], timeout),
        middlewares=[async_geth_poa_middleware],
    )

