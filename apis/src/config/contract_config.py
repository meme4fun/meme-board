import json
import sys
from os import path

from cachetools.func import ttl_cache

ROOT_DIR = path.dirname(path.dirname(path.abspath(__file__)))
sys.path.insert(0, ROOT_DIR)

DEFAULT_ABI_JSON_FILE_PATH = path.join(ROOT_DIR, 'idl')

@ttl_cache(ttl=60 * 60 * 24)
def get_program_idl(contract_name: str, abi_dir=DEFAULT_ABI_JSON_FILE_PATH):
    file_name = f"{contract_name}.json"
    file_full_name = path.join(abi_dir, file_name)
    from pathlib import Path
    p = Path(file_full_name)
    return p.read_text()


Meme4Fun_PROGRAM_NAME = 'Meme4Fun'
IMeme4Fun_PROGRAM_IDL = get_program_idl(Meme4Fun_PROGRAM_NAME)
