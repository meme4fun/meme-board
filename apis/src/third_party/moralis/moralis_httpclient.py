#!/usr/bin/env python
import asyncio
import logging
import random

from asyncio.exceptions import TimeoutError
from aiohttp import ServerTimeoutError
from common.http_client import HttpClient
from common.utils import run_sync, EnumBase, async_ttl_cache
from const.env_const import ENV_DEV, ENV_PROD
import urllib.parse


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


class MoralisClient(HttpClient):
    BASE_URL = "https://deep-index.moralis.io"
    API_KEY_LIST = [
    ]

    def __init__(self):
        super(MoralisClient, self).__init__()
        self.semaphore = asyncio.Semaphore(4 * len(self.API_KEY_LIST))

    def build_url(self, path):
        return f"{self.BASE_URL}{path}"

    @property
    def headers(self):
        headers = {
            "Accept": "application/json",
            "X-API-Key": random.choice(self.API_KEY_LIST)
        }
        return headers
        
    async def _get(self, path):
        url = self.build_url(path)
        logging.info(f"url:{url} headers={self.headers}")
        return await self.get(url, headers=self.headers)

    async def getTransactions(self, account_address, limit=100, cursor=None, network=None):
        """
        {
          "hash": "0xa4db879aaa73da34ffd794a5b5054d2552dcf02fa4a15ae2bf4dae522b6c4785",
          "nonce": "1241",
          "transaction_index": "152",
          "from_address": "0xfa262115e29e2ca117ea78389a6ef1204a4ed484",
          "to_address": "0x9a7dc5307940fa170f9093ca548bda0edb602767",
          "value": "90000000000000000",
          "gas": "21000",
          "gas_price": "13635451808",
          "input": "0x",
          "receipt_cumulative_gas_used": "13334828",
          "receipt_gas_used": "21000",
          "receipt_contract_address": null,
          "receipt_root": null,
          "receipt_status": "1",
          "block_timestamp": "2022-08-29T00:51:06.000Z",
          "block_number": "15431052",
          "block_hash": "0xd600ad6e7a652647c13b10d2605308ccc0c44b41c7940dab771f297be7ea955f",
          "transfer_index": [
            15431052,
            152
          ]
        }
        """
        path = f"/api/v2.2/{account_address}?limit={limit}&chain={network}"
        if cursor:
            path += f"&cursor={cursor}"
        return await self._get(path)

    async def getWalletNFTTransfers(self, account_address, from_block=None, to_block=None, direction=None, cursor=None,
                                    limit=100):
        """
        https://docs.moralis.io/web3-data-api/reference/get-wallet-nft-transfers
        {
          "block_number": "15060147",
          "block_timestamp": "2022-07-02T01:45:02.000Z",
          "block_hash": "0x34d1dfc504de1c1c62bd798d4062f1292a58bc49f997d925c3fc96999d28c4e3",
          "transaction_hash": "0x79f493e440dd5ec17fe686509aca7061e89020a114cc71ef4b8ced3f9832d302",
          "transaction_index": 52,
          "log_index": 84,
          "value": "0",
          "contract_type": "ERC721",
          "transaction_type": "Single",
          "token_address": "0xac2a6706285b91143eaded25d946ff17a60a6512",
          "token_id": "4409",
          "from_address": "0x593b94c059f37f1af542c25a0f4b22cd2695fb68",
          "to_address": "0xac2a6706285b91143eaded25d946ff17a60a6512",
          "amount": "1",
          "verified": 1,
          "operator": null
        }
        """
        # [from_block, to_block]
        path = f"/api/v2/{account_address}/nft/transfers?limit={limit}"
        if cursor:
            path += f"&cursor={cursor}"
        if from_block:
            path += f"&from_block={from_block}"
        if to_block:
            path += f"&to_block={to_block}"
        if direction:
            path += f"&direction={direction}"
        return await self._get(path)

    async def getWalletNFTs(self, account_address, limit=100, cursor=None):
        """
        {
          "token_address": "0xe7afb4189603a901b74f8085f775931a60996166",
          "token_id": "10224",
          "owner_of": "0x8869e7b48e33c5f1fffb0f15f6084c7b438d6371",
          "block_number": "15523819",
          "block_number_minted": "15523819",
          "token_hash": "16367dc714d51cb4f04776f25f2cd49f",
          "amount": "3",
          "contract_type": "ERC1155",
          "name": "Blockbob",
          "symbol": "BLOB",
          "token_uri": "https://ipfs.moralis.io:2053/ipfs/bafkreih3up4gkomyda46p2fz7rfmkegnfnbdec3yjec2wwrhsqz6v526zq",
          "metadata": "{\"name\":\"SHB\",\"description\":\"Shibuya Pixel Art ED 22\",\"image\":\"ipfs://ipfs/bafybeihvmej2sjdqcxs6gfqcbdmu3m3gdsnvu7p7zlbiq5xvbkd5eigq7e/image.png\",\"external_url\":\"https://rarible.com/token/0xe7afb4189603a901b74f8085f775931a60996166:10224\",\"attributes\":[{\"key\":\"Name\",\"trait_type\":\"Name\",\"value\":\"SHB\"},{\"key\":\"Mode\",\"trait_type\":\"Mode\",\"value\":\"Mm\"},{\"key\":\"Collection\",\"trait_type\":\"Collection\",\"value\":\"Artifact\"}]}",
          "last_token_uri_sync": "2022-09-13T00:03:33.540Z",
          "last_metadata_sync": "2022-09-13T00:03:43.429Z"
        }
        """
        path = f"/api/v2/{account_address}/nft?limit={limit}&chain=eth"
        if cursor:
            path += f"&cursor={cursor}"
        return await self._get(path)

    async def getNFTMetadata(self, account_address, token_id):
        """
        {
            "token_address": "0xac2a6706285b91143eaded25d946ff17a60a6512",
            "token_id": "1916",
            "transfer_index": [
                    14891947,
                    96,
                    144,
                    0
                ],
            "owner_of": "0x412acad86ffa3b287c1043ab4e56f7c4a6a9e385",
            "block_number": "14891947",
            "block_number_minted": "14449910",
            "token_hash": "c534f5ebb0a6ee9f060eedd40fe28df4",
            "amount": "1",
            "contract_type": "ERC721",
            "name": "Gaming Ape Club",
            "symbol": "GAC",
            "token_uri": "https://ipfs.moralis.io:2053/ipfs/Qmb7bLzwyKXy8cXqrunrmWLVwLN6yVACkDUa4foZbyKskj/1916",
            "metadata": "{\"name\":\"Gaming Ape Club #1916\",\"external_url\":\"https://www.gamingapeclub.com/\",\"image\":\"https://cc_nftstore.mypinata.cloud/ipfs/Qmcs5wVVKyTmVh4jRb2Zsaj5D9mrgmJyTG5Xfie5p6NPH6/1916.webp\",\"attributes\":[{\"trait_type\":\"Eyes\",\"value\":\"Brown\"},{\"trait_type\":\"Expression\",\"value\":\"Angry Closed\"},{\"trait_type\":\"Background\",\"value\":\"Background\"},{\"trait_type\":\"Backbling\",\"value\":\"Skateboard\"},{\"trait_type\":\"Fur\",\"value\":\"Light Red\"},{\"trait_type\":\"Nose\",\"value\":\"Silver \"},{\"trait_type\":\"Clothing\",\"value\":\"Rainbow Hoodie\"},{\"trait_type\":\"Earring\",\"value\":\"Gold Stud\"},{\"trait_type\":\"Headwear\",\"value\":\"White Bandana\"},{\"trait_type\":\"Eyewear\",\"value\":\"Red VR\"}]}",
            "last_token_uri_sync": "2022-05-18T21:23:38.153Z",
            "last_metadata_sync": "2022-05-19T01:55:09.600Z"
        }
        """
        path = f"/api/v2/nft/{account_address}/{token_id}"
        return await self._get(path)

    async def get_native_balance(self, account_address):
        """
        {
          "balance": "60959878853065010498"
        }
        """
        path = f"/api/v2/{account_address}/balance"
        return await self._get(path)
    

moralisClientIns = None
async def get_moralisClientIns():
    global moralisClientIns
    if moralisClientIns:
        return moralisClientIns
    else:
        ins = MoralisClient()
        await ins.initialize()
        moralisClientIns = ins
    return ins

if __name__ == '__main__':
    pass
    # print(moralisClientIns.headers)
    resp = run_sync(moralisClientIns.getTransactions("0x4B171d2C5Af4Fa9F2cA55D6809E5931596b17A20"))
    print(resp)
