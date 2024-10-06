import { useBalance } from 'wagmi';
import { useMobxSelector } from './useMobxSelector';
import { useStore } from '@/store';
import { useEffect } from 'react';

export function useCurrentBalance() {
  const { god } = useStore();
  const chainId = useMobxSelector(() => god.currentChainId);
  const account = useMobxSelector(() => god.account);
  const balanceRequest = useBalance({
    chainId,
    address: account as any,
  });

  useEffect(() => {
    balanceRequest.refetch();
  }, [account, chainId]);

  return balanceRequest;
}
