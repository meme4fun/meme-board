import { getNetworkByNameOrId } from '@/constants/Networks';
import { useMemo } from 'react';

export function useCurrencySymbol(chainId: number) {
  const symbol = useMemo(() => {
    return getNetworkByNameOrId(chainId).nativeCurrency.symbol;
  }, [chainId]);
  return symbol;
}
