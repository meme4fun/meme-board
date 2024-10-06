import { ServerCacheManager } from '@alien-mm/servers';
import getFEOAServerFetcher from './fetcher/feoa.serverapi';

import { IS_GRAY, IS_TESTNET, isProd } from '@/constants';
import { get, groupBy, isEqual, uniqBy } from 'lodash';
import * as allChains from 'viem/chains';

import EventEmitter from 'events';
import { TwoLevelsCacheUtil } from '@alien-mm/utils/dist/cacheUtils';
import { safeGetSettleValue } from '@alien-mm/utils';

const getCacheKey = (key: string) => {
  return `${key}${IS_TESTNET ? '_testnet' : '_mainnet'}${!IS_GRAY ? '_temp' : ''}`;
};

const l2Cache = ServerCacheManager.dbCache;
const l2ttl = !IS_GRAY ? 0 : 360;

const feoaEvents = new EventEmitter();

let feoaChains;

export function subscribeFEOAChainsUpdate(cb) {
  getFEOAChainsConfig().then(cb);
  feoaEvents.on('feoa.chains.update', cb);
}

export const getFEOASettingConfig = async () => {
  return TwoLevelsCacheUtil({
    l1Cache: ServerCacheManager.memoryCache,
    l1ttl: 60,
    l2Cache,
    l2ttl,
    cacheKey: getCacheKey(`getFEOASettingConfig`),
    async fetcher() {
      const fetcher = getFEOAServerFetcher();
      const res = await fetcher.get('app_settings:list', {
        params: {
          pageSize: 1000,
          // tree: true,
          filter: {
            $and: [
              { enable: { $isTruly: true } },
              {
                $or: [
                  {
                    key: {
                      $eq: IS_TESTNET
                        ? 'alienx_hal_bridge_config'
                        : 'alienx_mainnet_bridge_config',
                    },
                  },
                ],
              },
            ],
          },
          appends: ['options_value.value'],
        },
      });

      const settings = res?.data?.data;
      const settingObject = {};

      settings?.forEach((s) => {
        let value = s[`${s.type}_value`];
        if (s.type === 'options') {
          value = s.options_value.value;
        }
        settingObject[s.key] = value;
      });

      // console.log('💬️ ~ fetcher ~ settingObject:', settingObject);
      return settingObject;
    },
  }).get();
};

export const getFEOAGlobalConfig = async () => {
  const [chainsSettle] = await Promise.allSettled([getFEOASettingConfig()]);
  return {
    chains: safeGetSettleValue(chainsSettle, []),
  };
};
