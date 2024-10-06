import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, Box, BoxProps } from '@asuikit/core';
import { STATIC_BASEURL } from '@/constants';
import { PolymorphicComponentProps } from '@asuikit/utils';
import { isBrowser } from '@/utils';

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const COIN_IMAGE_URL_MAP =
  (!isBrowser ? {} : globalThis.globalConfig?.setting?.tokenImageMap) || {};

export type TIconCoin = PolymorphicComponentProps<'img', BoxProps> & {
  coin?: 'eth' | 'weth' | 'eth-v2' | string;
  src?: string;
  size?: number;
  coinContract?: string;
  price?: any;
};

const IconCoin: React.FC<TIconCoin> = (props) => {
  const {
    coin: _coin,
    src,
    size = '1em',
    coinContract: _coinContract,
    price,
    ...boxProps
  } = props;

  let coin = _coin || 'ETH';
  let coinContract = _coinContract;

  if (price) {
    coinContract = price.currency?.contract;
    coin = price.currency?.symbol;
  }

  const realSrc = useMemo(() => {
    if (src) return src;
    if (['eth', 'eth-v2', 'weth', 'beth'].includes(coin?.toLocaleLowerCase())) {
      return `${STATIC_BASEURL}/images/coin/${coin.toLocaleLowerCase()}.svg`;
    }

    // if (coinContract) {
    //   return `https://api.reservoir.tools/redirect/currency/${coinContract}/icon/v1`;
    // }
    // return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/${coin.toLocaleLowerCase()}.png`;
    return (
      COIN_IMAGE_URL_MAP[coin] ||
      `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${coin}.svg`
    );
  }, [coin, src]);

  return (
    <Box
      component="img"
      sx={{ width: size, height: size }}
      {...boxProps}
      src={realSrc}
    />
  );
};

export default memo(IconCoin);
