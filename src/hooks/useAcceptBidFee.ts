import { useMemo } from 'react';

export function useAcceptBidFee(amountDecimal: number, feeBreakdown?: any[]) {
  return useMemo(() => {
    let marketplaceFee = 0;
    let royaltyFee = 0;

    feeBreakdown?.forEach((item) => {
      if (item.kind === 'marketplace') {
        marketplaceFee = ((item.bps ?? 0) / 10000) * amountDecimal;
      }
      if (item.kind === 'royalty') {
        royaltyFee = ((item.bps ?? 0) / 10000) * amountDecimal;
      }
    });
    return { marketplaceFee, royaltyFee };
  }, [amountDecimal, feeBreakdown]);
}
