import base64
import csv
import sys

from datetime import datetime, timezone
from decimal import Decimal, ROUND_DOWN, ROUND_HALF_UP
from enum import Enum
from time import time
import asyncio
import functools
import hashlib
import html
import json
import logging.handlers
import os
import re
import string
import pytz
import atexit
import cachetools
import traceback

from common.common_exception import CommonException, IllegalParamException


try:
    # Use secrets module if available (Python version >= 3.6) per PEP 506
    import secrets

    random = secrets.SystemRandom()
except ImportError:
    import random as _random

    random = _random.SystemRandom()


# generate_alphanumeric_string
def gen_letter_digits_str(length):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))


def gen_digits_str(length):
    return ''.join(random.choice(string.digits) for _ in range(length))


def get_cur_time_ms():
    '''
    return current timestamp in milliseconds
    '''
    return int(time() * 1000)


def get_cur_time_secs():
    '''
    return current timestamp in seconds
    '''
    return int(time())


def escape_string(s):
    return html.escape(s)


def hex_to_int(hex_str: str) -> int:
    assert (hex_str.startswith('0x'))
    return int(hex_str, 16)


def re_match(pattern, content, error_code):
    if not content:
        raise CommonException(error_code)

    result = re.match(pattern, content)
    if not result or result.span()[1] is not len(content):
        raise CommonException(error_code)


# def re_match_ip(ip):
#     pattern = r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'
#     re_match(pattern, ip, STATUS_INVALID_IP_ADDRESS)


def re_match_code(code, err_code):
    pattern = r'^\d{6}$'
    re_match(pattern, code, err_code)


def get_cur_time_sec():
    """
    return current timestamp in seconds
    """
    return int(time())


def date_str_to_stamp(date_str):
    import time
    timeArray = time.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    time_stamp = int(time.mktime(timeArray))
    return time_stamp


async def safe_gather(*args, **kwargs):
    try:
        return await asyncio.gather(*args, **kwargs)
    except Exception as e:
        logging.getLogger().debug(f"Unhandled error in background task: {str(e)}", exc_info=True)
        raise


DEFAULT_DECIMALS = 8


class EnumBase(Enum):

    @classmethod
    def get_name_by_value(cls, value):
        value_to_name = {item.value: item.name for item in list(cls)}
        return value_to_name[value]

    @classmethod
    def keys(cls):
        return [item.name for item in list(cls)]

    @classmethod
    def values(cls):
        return [item.value for item in list(cls)]

    @classmethod
    def verbose(cls, value, default_value=None):
        for item in list(cls):
            if item.value == value:
                return item.name
        return default_value


def export_to_csv(filename, data):
    fieldnames = data[0].keys()

    with open(filename, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)


def async_request_rate_limit(semaphore, interval=1):
    def wrapper(func):
        last_req_time = time()

        @functools.wraps(func)
        async def wrapped(*args, **kwargs):
            nonlocal last_req_time

            async with semaphore:
                now = time()
                elapsed_time = now - last_req_time

                if elapsed_time < interval:
                    await asyncio.sleep(interval - elapsed_time)

                last_req_time = time()
                return await func(*args, **kwargs)

        return wrapped

    return wrapper


def split_continuation(continuation):
    try:
        continuation_token = base64.b64decode(continuation).decode('utf-8')
        return continuation_token.split('_')
    except Exception as ex:
        logging.exception(ex)
        raise IllegalParamException(f"Invalid continuation")


def build_continuation(continuation):
    return base64.b64encode(f"{continuation}".encode("utf-8")).decode("utf-8")


def decimal_to_wei(f):
    return int(f * (10 ** 18))


def wei_to_decimal(f):
    return Decimal(str(f / (10 ** 18)))


def validate_twitter_link(link):
    twitter_pattern = r"https?://twitter\.com/\w+/status/\d+"
    x_pattern = r"https?://x\.com/\w+/status/\d+"
    return bool(re.match(twitter_pattern, link) or re.match(x_pattern, link))


def ipfs_url_to_cid(ipfs_url):
    if ipfs_url.startswith("https://cloudflare-ipfs.com/ipfs/"):
        return ipfs_url.replace("https://cloudflare-ipfs.com/ipfs/", "ipfs://")
    elif ipfs_url.startswith("https://ipfs.io/ipfs/"):
        return ipfs_url.replace("https://ipfs.io/ipfs/", "ipfs://")
    return ipfs_url


if __name__ == '__main__':
    pass
