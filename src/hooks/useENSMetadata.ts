import { isENSContract } from '@/utils/web3Utils';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import axiosThrottle from 'axios-request-throttle';
import { camelCase } from 'lodash';

const ensAxios = setupCache(
  axios.create({
    validateStatus: () => true,
  }),
  {
    ttl: 1000 * 60 * 60,
    methods: ['get'],
    interpretHeader: false,
    etag: false,
    modifiedSince: false,
  },
);
axiosThrottle.use(ensAxios, { requestsPerSecond: 1 });

export default function useENSMetadata(
  tokenId?: string,
  contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
  networkName = 'mainnet',
) {
  return useRequest(
    async () => {
      if (!isENSContract(contractAddress) || !tokenId) return null;

      const res = await ensAxios.get(
        `https://metadata.ens.domains/${networkName}/${contractAddress}/${tokenId}`,
      );

      const reslut = { ...res.data };

      res.data.attributes?.forEach((item) => {
        reslut[camelCase(item['trait_type'])] = item.value;
      });
      return reslut;
    },
    {
      ready: isENSContract(contractAddress) && !!tokenId,
      cacheKey:
        contractAddress && tokenId
          ? `${contractAddress}:${tokenId}`
          : undefined,
    },
  );
}
