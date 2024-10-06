const { RENDER_EXTERNAL_URL, RENDER_GIT_BRANCH } = process.env;

module.exports = {
  APP_ENV: 'staging',
  APP_HOST: '',
  ALIENSWAP_APP_HOST: '',
  Zero_Gas_APP_HOST: '',
  STATIC_BASEURL: process.env.STATIC_BASEURL || '',
  API_HOST_URL: process.env.API_HOST_URL || '',
  BFF_API_HOST_URL:
    process.env.BFF_API_HOST_URL || '',
  // REDIS_URL: process.env.REDIS_URL,
  STATIC_S3_HOST:
    process.env.STATIC_S3_HOST || '',
  CREATEX_APP_HOST: '',
};
