# -*- coding: utf-8 -*-
import json

from web3 import Web3


def hex_str_to_json(hex_str):
    if hex_str.startswith("0x"):
        hex_str = hex_str.lstrip("0x")
    return bytes.fromhex(hex_str).decode('utf-8')


class HexBytesEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, bytes):
            return obj.hex()
        return super().default(obj)


def int_to_hex_str(num):
    return Web3.to_hex(Web3.to_bytes(num))
