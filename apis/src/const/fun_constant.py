import base58

from common.utils import EnumBase
from config.git_config import CUR_ENV
from const.common_constant import CommonTables
from const.env_const import ENV_PROD

if CUR_ENV == ENV_PROD:
    MEME4FUN_PROGRAM = ""
else:
    MEME4FUN_PROGRAM = ""

FEE_BPS = 100  # 100/10000
STATE_SEED = b""
MINT_SEED = b""
BONDING_CURVE_SEED = b""
RESERVE_SEED = b""


class EventType(EnumBase):
    TokenCreated = 0
    OrderCompleted = 1
    PreSaleEnded = 2
    Migrated = 3


LAUNCH_STEP_1 = 1
LAUNCH_STEP_2 = 2
LAUNCH_STEP_3 = 3
LAUNCH_STEP_4 = 4
LAUNCH_STEP_5 = 5
LAUNCH_STEP_6 = 6
LAUNCH_STEP_7 = 7
LAUNCH_STEPS = (LAUNCH_STEP_1, LAUNCH_STEP_2, LAUNCH_STEP_3, LAUNCH_STEP_4, LAUNCH_STEP_5, LAUNCH_STEP_6, LAUNCH_STEP_7)


class Tables(CommonTables):
    pass


class SyncTasks(EnumBase):
    MEME4FUN = "meme4fun"
