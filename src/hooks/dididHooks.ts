import { useRequest } from 'ahooks';
import { ethers } from 'ethers';

export const useDidName = (address?: string) => {
  return useRequest(
    async () => {
      if (address && ethers.isAddress(address)) {
        const res = await fetch('https://indexer-v1.did.id/', {
          body: `{"jsonrpc":"2.0","id":0,"method":"das_reverseRecord","params":[{"type":"blockchain","key_info":{"key":"${address}","coin_type":"60"}}]}`,
          method: 'POST',
        });

        const data = await res.json();
        return data?.result.data.account;
      }
    },
    {
      cacheKey: `${address}_did_name`,
      refreshDeps: [address],
    },
  );
};
