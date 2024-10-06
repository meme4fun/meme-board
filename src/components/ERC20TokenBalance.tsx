import React, { useEffect } from 'react';
import { useBalance } from 'wagmi';
import { isNullAddress } from '@/utils';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

interface ERC20TokenBalanceProps {
  address: `0x${string}`;
  tokenAddress: `0x${string}`;
  children: (balance: ReturnType<typeof useBalance>) => React.ReactNode;
}

const ERC20TokenBalance: React.FC<ERC20TokenBalanceProps> = ({
  address,
  tokenAddress,
  children,
}) => {
  console.log(
    '💬️ ~ file: ERC20TokenBalance.tsx:18 ~ tokenAddress:',
    tokenAddress,
  );
  const { god } = useStore();

  const balance = useBalance({
    address,
    token: isNullAddress(tokenAddress) ? undefined : tokenAddress,
    chainId: god.currentChainId,
    cacheTime: 1000,
    onError(err) {
      console.warn(err);
    },
  });

  useEffect(() => {
    balance.refetch({
      address,
      token: isNullAddress(tokenAddress) ? undefined : tokenAddress,
      chainId: god.currentChainId,
    } as any);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [god.currentChainId]);
  return <>{children(balance)}</>;
};

export default observer(ERC20TokenBalance);
