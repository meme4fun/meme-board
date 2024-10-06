const isTestNet = process.env.NETWORK_TYPE === 'TESTNET';

module.exports = {
  APP_ENV: 'production',
  STATIC_BASEURL: '',
  APP_HOST: '',
  ALIENSWAP_APP_HOST: '',
  Zero_Gas_APP_HOST: '',
  API_HOST_URL: '',
  ALIENSWAP_API_HOST_URL: '',
  // WEB3BASE_API_HOST_URL: 'https://web3base-test-api.blockcreateart.co',
  NETWORK_TYPE: process.env.NETWORK_TYPE || 'MAINNET',
  // REDIS_HOST: '',
  // REDIS_PORT: '',
  // REDIS_PASSWORD: '',
  // REDIS_DB: '',
  SENTRY_DSN: process.env.SENTRY_DSN,
  IS_GRAY: process.env.SETUP_ENV === 'gray',
  STATIC_S3_HOST: '',
  CREATEX_APP_HOST: '',
};
