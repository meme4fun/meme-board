import React, { useEffect, useMemo } from 'react';
import { Text, TextProps, Skeleton } from '@asuikit/core';
import { useStore } from '@/store';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FiatSymbols } from '@/constants/fiat';
import TokenState from '@/store/lib/TokenState';
import { parseCoinToFiat, prettyNumber } from '@/utils';
import { CoingeckoFiatIdMap } from '@/constants/fiat';
import { createPolymorphicComponent } from '@asuikit/utils';

type FiatPriceTextProps = TextProps & {
  coin?: keyof typeof CoingeckoFiatIdMap | 'usd' | string;
  coins?: { symbol: string; value: number }[];
  value?: number;
  digits?: number;
  component?: any;

  groupSeparator?: boolean;
  onUpdate?: (usdPrice: number) => void;
};

const FiatPriceText: React.FC<FiatPriceTextProps> = (props) => {
  const {
    onUpdate,
    coins,
    coin,
    value = 0,
    component = 'span',
    digits = 2,
    groupSeparator = false,
    ...otherProps
  } = props;

  const { alien, setting, god } = useStore();
  const { assetsTokens } = alien;

  const store = useLocalObservable(() => ({
    coins: [] as { symbol: string; value: number }[],
    coin,

    get tokens() {
      if (!this.coins.length) return [];
      return this.coins
        .map((coin) => {
          let symbol = coin.symbol.toLocaleLowerCase();
          if (['weth', 'beth'].includes(symbol)) {
            symbol = 'eth';
          }
          if (!CoingeckoFiatIdMap[symbol]) {
            console.error('not found "' + symbol + '" coingecok id');
            return null;
          }
          if (symbol === 'usd') {
            const usdToken = new TokenState({
              symbol,
              chainId: god.currentChain?.chainId ?? 1,
            });
            // usdToken.fiatPriceState.value = { usd: 1 };
            return {
              value: coin.value,
              tokenState: usdToken,
            };
          }
          return {
            value: coin.value,
            tokenState: new TokenState({
              symbol,
              chainId: god.currentChain?.chainId ?? 1,
              coingeckoPriceUrl: `/api/finance/coins/${CoingeckoFiatIdMap[symbol]}`,
            }),
          };
        })
        .filter(Boolean);
    },

    get loading() {
      return this.tokens.some(
        (token) => token?.tokenState.fiatPriceState.loading.value,
      );
    },

    get totalPrice() {
      if (this.loading) return 0;
      const res = this.tokens?.reduce((pv, cv) => {
        if (!cv) return pv;
        // return pv + cv.tokenState.fiatPrice * cv.value;
        return 0;
      }, 0);
      return res;
    },
  }));

  useEffect(() => {
    if (coin && coin !== 'usd') {
      store.coins = [{ symbol: coin as string, value }];
    }
    if (coins && store.coins !== coins) {
      store.coins = coins.filter((c) => c.symbol !== 'usd');
    }
  }, [coin, coins, store, value]);

  // if (coin === 'usd') {
  //   store.coin = coin;
  // }

  useEffect(() => {
    if (store.totalPrice) onUpdate?.(store.totalPrice);
  }, [onUpdate, store.totalPrice]);

  const displayText = useMemo(() => {
    let result = '0';
    if (coin === 'usd') {
      result = Number(value).toFixed(digits);
    } else {
      result = parseCoinToFiat(1, store.totalPrice).toString();
    }

    if (groupSeparator) {
      result = prettyNumber(result, true, {
        decimalPlaces: 0,
      }).toString();
    }

    return result;
  }, [coin, groupSeparator, store.totalPrice, value]);

  if (store.loading) {
    return (
      <Skeleton style={{ display: 'inline-block' }} width={80} height={12} />
    );
  }

  return (
    <Text component={component} {...otherProps}>
      <span className="fiat-symbol">{FiatSymbols[setting.fiat]}</span>
      <span className="fiat-price">{displayText}</span>
    </Text>
  );
};

export default createPolymorphicComponent<'span', FiatPriceTextProps>(
  observer(FiatPriceText),
);
