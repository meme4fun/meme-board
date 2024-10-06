import { buildMemoryStorage, setupCache } from 'axios-cache-interceptor';
import axios from 'axios';
import { merge } from 'lodash';
import { IS_GRAY, isDev, isProd, isStaging } from '@/constants';
import qs from 'qs';

// const AlienSwapServerFetcherMap = {};

/* Networks.forEach((network) => {
  const instance = axios.create({
    baseURL: process.env.INTERNAL_API_HOST_URL,
    headers: {
      'User-Agent': 'alienswap-axios-agent',
      ...(process.env.SETUP_ENV
        ? {
            'x-gray': 'true',
          }
        : {}),
    },
  });

  instance.interceptors.request.use((config) => {
    const apiNetworkName = (
      config.params?.network ||
      config.data?.network ||
      ALIEN_NETWORK_MAPS[network.name] ||
      network.name
    )
      ?.toLocaleLowerCase()
      .replace(/[\s-_]/gi, '');

    config.params = merge({}, config.params, { network: apiNetworkName });
    config.data = merge({}, config?.data ?? {}, { network: apiNetworkName });
    return config;
  });

  AlienSwapServerFetcherMap[network.id] = setupCache(instance, {
    ttl: 1000 * 60,
    methods: ['get'],
    interpretHeader: false,
    etag: false,
    modifiedSince: false,
    storage: buildMemoryStorage(false, false, 1000),
  });
}); */

const instance = axios.create({
  baseURL: 'https://fe-oa-private-api.alienxchain.io/api/',
  headers: {
    'User-Agent': 'alienxchain-axios-agent',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVOYW1lIjoicHVibGljX2FwaSIsImlhdCI6MTcwMzA4NjM0NSwiZXhwIjozMzI2MDY4NjM0NX0.h_1DiV98li7XvL0xj4BZhFeKaws7181lekLSKvWnpVY',
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, {
        strictNullHandling: true,
        arrayFormat: 'brackets',
      });
    },
  },
});

instance.interceptors.request.use((config) => {
  // const store = getStore();
  if (!isDev) {
    if (!config.params.filter) {
      config.params.filter = `{"$and":[{"env":{"$anyOf":["${
        isStaging ? 'stag' : IS_GRAY ? 'gray' : 'prod'
      }"]}}]}`;
    } else {
      const filter = config.params.filter;

      (filter['$and'] || filter['$or']).push({
        env: { $anyOf: [isStaging ? 'stag' : IS_GRAY ? 'gray' : 'prod'] },
      });
    }
  }

  return config;
});

const cacheInstance = setupCache(instance, {
  ttl: 1000 * 5,
  methods: ['get'],
  interpretHeader: false,
  etag: false,
  modifiedSince: false,
  storage: buildMemoryStorage(false, false, 1000),
});

// instance.interceptors.request.use((config) => {
//   const apiNetworkName = (
//     config.params?.network ||
//     config.data?.network ||
//     ALIEN_NETWORK_MAPS[network.name] ||
//     network.name
//   )
//     ?.toLocaleLowerCase()
//     .replace(/[\s-_]/gi, '');

//   config.params = merge({}, config.params, { network: apiNetworkName });
//   config.data = merge({}, config?.data ?? {}, { network: apiNetworkName });
//   return config;
// });

instance.interceptors.request.use((config) => {
  const header = config.headers || {};
  header['CF-Access-Client-Id'] = 'c5ef71c1eb3af28764b3b310c3186db2.access';
  header['CF-Access-Client-Secret'] =
    '6c924f53e01b3384972b1f0497542e6787dae69a17500c52c49ca3c0f93bc303';
  return config;
});

export default function getFEOAServerFetcher(): // chainId: string | number = getStore().god.defaultChainId,
ReturnType<typeof setupCache> {
  // chainId = getNetworkByNameOrId(chainId).id;

  return cacheInstance;
  // return AlienSwapServerFetcherMap[chainId];
}

// axiosThrottle.use(NFTScanAxios, { requestsPerSecond: 4 });

// export default NFTScanMainnetAxios;
