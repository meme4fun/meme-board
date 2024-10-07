from common.utils import EnumBase


class Currency(EnumBase):
    ETH = "ETH"


class SortDirection(EnumBase):
    desc = "desc"
    asc = "asc"
