

from common.constant import ChainIDEnum, ChainName, OtherChain
from config.env_config import CUR_ENV, ENV_PROD

BSC_RPC_HOST = "https://bsc-dataseed.binance.org/"

INFURA_API_KEY_LIST = [
]
MATIC_API_KEY_LIST = [
]


def gen_infura_rpc_list(chain_name, extra_list=None) -> [str]:
    prifix_map = {
        ChainName.SEPOLIA: "https://sepolia.infura.io/v3/",
        ChainName.LINEA: "https://linea-mainnet.infura.io/v3/",
        ChainName.ARBITRUM: "https://arbitrum-mainnet.infura.io/v3/",
    }
    host = prifix_map[chain_name]
    rpc_list = list()
    for key in INFURA_API_KEY_LIST:
        rpc_list.append(host + key)
    if extra_list is not None:
        rpc_list.extend(extra_list)
    return rpc_list


MAIN_ETH_NETWORK_CONFIG = {
    'chain_id': ChainIDEnum.ETH.value,
    'currency': 'ETH',
    'chain_name': ChainName.ETH,
    'web3_host': "",
    'web3_host_list': [
    ],
}


OPMAINNET_NETWORK_CONFIG = {
    'chain_id': ChainIDEnum.OPMAINNET.value,
    'currency': 'ETH',
    'chain_name': ChainName.OPMAINNET,
    'web3_host': "",
    'web3_host_list': gen_infura_rpc_list(ChainName.OPMAINNET, extra_list=[]),
}

SEPOLIA_NETWORK_CONFIG = {
    'chain_id': ChainIDEnum.SEPOLIA.value,
    'currency': 'ETH',
    'chain_name': ChainName.SEPOLIA,
    'web3_host': "",
    'web3_host_list': gen_infura_rpc_list(ChainName.SEPOLIA, extra_list=[]),
}

ARB_NETWORK_CONFIG = {
    'chain_id': ChainIDEnum.ARBITRUM.value,
    'currency': 'ETH',
    'chain_name': ChainName.ARBITRUM,
    'web3_host': "",
    'web3_host_list': [
    ],
}

ARB_SEPOLIA_NETWORK_CONFIG = {
    'chain_id': ChainIDEnum.ARBITRUMSEPOLIA.value,
    'currency': 'ETH',
    'chain_name': ChainName.ARBITRUMSEPOLIA,
    'web3_host': "",
    'web3_host_list': [
    ],
}


ALL_NETWORK_CONFIG = [
    MAIN_ETH_NETWORK_CONFIG,
    SEPOLIA_NETWORK_CONFIG,
    ARB_NETWORK_CONFIG,
    ARB_SEPOLIA_NETWORK_CONFIG,
    OPMAINNET_NETWORK_CONFIG,
]


def get_network_config(chain_name: str = None, chain_id: int = None) -> dict:
    if not chain_name and not chain_id:
        raise Exception(f"chain_name or chain_id must be specified")

    for ntw in ALL_NETWORK_CONFIG:
        if chain_name and ntw['chain_name'].lower() == chain_name.lower():
            return ntw
        if chain_id and str(ntw['chain_id']) == str(chain_id):
            return ntw
    raise Exception(f"Can not find chain_name={chain_name},chain_id={chain_id} config")


def get_solana_network():
    if CUR_ENV == ENV_PROD:
        SOLANA_RPC = ""  # mainnet
    else:
        SOLANA_RPC = ""  # devnet
    ntw = {
        'currency': "SOL",
        'chain_name': OtherChain.SOLANA.value,
        'web3_host_list': [
            SOLANA_RPC
        ],
    }
    return ntw
