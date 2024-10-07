
import json
import sys

sys.path.insert(0, "../")
from common.singleton import Singleton
from components.redis_db.redis_clients import get_redisCacheIns
from config.redis_config import USER_SOCIAL_BIND_CACHE_KEY
from datasource.user_social_ds import get_userSocialDataSourceIns, UserSocialDataSource
from common.utils import run_sync_clean


class SocialCache(metaclass=Singleton):
    EXPIRE = 3600 * 3

    def __init__(self):
        self.userSocialDataSourceIns = UserSocialDataSource()
    
    async def initialize(self):
        self.user_social_data_source = await get_userSocialDataSourceIns()
        self.redis_cache = await get_redisCacheIns()

    async def upsert_user_social_info(self, fields: dict):
        key = USER_SOCIAL_BIND_CACHE_KEY.format(user_id=fields["user_id"])
        await self.user_social_data_source.upsert_user_social_info(fields)
        if await self.redis_cache.get(key):
            await self.redis_cache.delete(key)

    async def get_user_social_info(self, user_id: int) -> dict:
        key = USER_SOCIAL_BIND_CACHE_KEY.format(user_id=user_id)
        social_info = await self.redis_cache.get(key)
        if social_info:
            return json.loads(social_info)
        else:
            social_info = await self.user_social_data_source.get_social_info_by_user_id(user_id)
            await self.redis_cache.set(key, json.dumps(social_info), expire=self.EXPIRE)
            return social_info


socialCacheIns = None
async def get_socialCacheIns():
    global socialCacheIns
    if socialCacheIns:
        return socialCacheIns
    else:
        ins = SocialCache()
        await ins.initialize()
        socialCacheIns = ins
    return ins


if __name__ == '__main__':
    run_sync_clean(socialCacheIns.get_user_social_info(1))
