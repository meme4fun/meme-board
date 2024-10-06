import getConfig from 'next/config';
import { arbitrum, goerli, linea, mainnet } from 'wagmi/chains';

export const siteName = '';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const {
  STATIC_BASEURL,
  ALIENSWAP_API_HOST_URL,
  APP_ENV,
  // WEB3BASE_API_HOST_URL,
  NETWORK_TYPE,
  BFF_API_HOST_URL,
  REDIS_URL,
  APP_HOST = '',
  ALIENSWAP_APP_HOST = '',
  Zero_Gas_APP_HOST = '',
  SENTRY_DSN,
  ETAG,
  API_HOST_URL = '',
  // REDIS_PORT,
  // REDIS_PASSWORD,
  // REDIS_DB,
  IS_GRAY,
  STATIC_S3_HOST = '',
  CREATEX_APP_HOST = '',
  FE_STATIC_S3_HOST = '',
} = publicRuntimeConfig as Record<string, string>;

export const IS_TESTNET = NETWORK_TYPE === 'TESTNET';
// export const ZapperApiKEY = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
export const isProd = APP_ENV === 'production';
export const isStaging = APP_ENV === 'staging';
export const isDev = process.env.NODE_ENV === 'development';

export const MARKETPLACE_BPD_FEE = 50;
export const MARKETPLACE_FEE_RECIPIENT = '';

export const AlienSwapTwitterLink = '';
export const FollowAlienSwapTwitterLink = '';
export const AlienSwapDiscordLink = '';

export const ZeroGasSupportChainIds: number[] = [mainnet.id, goerli.id];
export const ZeroGasMintChainIds: number[] = [mainnet.id, goerli.id];
export const MeelierMintChainIds: number[] = [mainnet.id, goerli.id];

export const ZeroGasCurrentChainId = isProd ? mainnet.id : goerli.id;
export const ZeroGasBidPoolChainId = isProd ? mainnet.id : goerli.id;
export const MeelierChainId = isProd ? mainnet.id : goerli.id;
export const SocialNFTChainId = isProd ? linea.id : goerli.id;

export const MarketServiceFee = 0.02;

export const isOnlyFairLaunch = false;

export const Z_INDEX_MAX_SAFE_INTEGER = 2147483647;
