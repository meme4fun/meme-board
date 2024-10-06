import { ListTokenBody, PlaceBidBody } from '@reservoir0x/reservoir-sdk';
import { IS_TESTNET } from '.';

export const KNEW_MARKET_SET = new Set([]);

export const SUPPORT_MARKET_ORDERBOOK = !IS_TESTNET
  ? new Set(['reservoir', 'opensea'])
  : new Set(['reservoir']);

export const ALIENSWAP_MARKET_ORDER_KIND = {
  orderbook: 'reservoir',
  orderKind: '',
};

export const MakeOfferCommonParams: Required<PlaceBidBody>['params'][0] = {
  orderbook: 'reservoir',
  orderKind: '',
  excludeFlaggedTokens: true,
  automatedRoyalties: true,
  options: {},
};
export const ListTokenCommonParams: Partial<
  Required<ListTokenBody>['params'][0]
> = {
  orderbook: 'reservoir',
  orderKind: '',
  automatedRoyalties: true,
  options: {},
};


export const LISTING_DURATIONS = (t) => [
  {
    value: '6M',
    label: t('number_months', { count: 6 }),
  },
  {
    value: '2M',
    label: t('number_months', { count: 2 }),
  },
  {
    value: '1M',
    label: t('1 month'),
  },
  {
    value: '7d',
    label: t('7 days'),
  },
  {
    value: '3d',
    label: t('3 days'),
  },
  {
    value: '1d',
    label: t('1 day'),
  },
];

export const LISTING_DURATIONS_DEFAULT_VALUE = '2M';
