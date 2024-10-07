# -*- coding:utf-8 -*-
from common.utils import EnumBase

TM_SEC_23_HOUR = 23 * 3600


class ChainIDEnum(EnumBase):
    """
    chain type
    """
    ETH = 1
    BSC = 56
    BSCTEST = 97
    MATIC = 137
    SCROLLALPHA = 534353
    SEPOLIA = 11155111
    LINEA = 59144
    BASE = 8453
    ARBITRUM = 42161
    ARBITRUMSEPOLIA = 421614


class ERCType(EnumBase):
    ERC721 = 0
    ERC1155 = 1


class ChainName:
    ETH = ChainIDEnum.ETH.name.lower()
    ROPSTEN = ChainIDEnum.ROPSTEN.name.lower()
    BSC = ChainIDEnum.BSC.name.lower()
    BSCTEST = ChainIDEnum.BSCTEST.name.lower()
    MATIC = ChainIDEnum.MATIC.name.lower()
    RINKEBY = ChainIDEnum.RINKEBY.name.lower()
    SCROLLALPHA = ChainIDEnum.SCROLLALPHA.name.lower()
    SEPOLIA = ChainIDEnum.SEPOLIA.name.lower()
    LINEA = ChainIDEnum.LINEA.name.lower()
    BASE = ChainIDEnum.BASE.name.lower()
    ARBITRUM = ChainIDEnum.ARBITRUM.name.lower()
    ARBITRUMSEPOLIA = ChainIDEnum.ARBITRUMSEPOLIA.name.lower()
    ALL = (ETH, ROPSTEN, SCROLLALPHA, SEPOLIA, LINEA, BASE, ARBITRUM)


class OtherChain(EnumBase):
    SOLANA = "SOLANA"
    BTC = "BTC"
