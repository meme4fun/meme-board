const fs = require('fs');
const path = require('path');

try {
  const s = fs
    .readFileSync(path.join(__dirname, '.feishu'), 'utf-8')
    .split('\n');
  if (!s[0] || !s[1]) throw new Error('');
  process.env.FEISHU_I18N_BOT_APP_ID = s[0];
  process.env.FEISHU_I18N_BOT_APP_SECRET = s[1];
} catch (err) {}


module.exports = {
  apps: [
    {
      name:
        'alienswap-frontend-node' +
        (process.env.SETUP_ENV ? '-' + process.env.SETUP_ENV : ''),
      script: 'npm',
      args: `run start -- -p ${process.env.PROT || 3000}`,
      cwd: process.env.DEPLOY_CWD,
      interpreter: '/bin/bash',
      instances: process.env.PM2_INSTANCES || 1,
      exec_mode: 'cluster',
      // autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        FEISHU_I18N_BOT_APP_ID: process.env.FEISHU_I18N_BOT_APP_ID,
        FEISHU_I18N_BOT_APP_SECRET: process.env.FEISHU_I18N_BOT_APP_SECRET,
        STATIC_BASEURL: 'https://multisat.io/',
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
        SENTRY_DSN: process.env.SENTRY_DSN,
        REDIS_URL: '',
        APP_ENV: 'production',
      },
    },
  ],
  // deploy: {
  //   production: deployProduction,
  //   gray: Object.assign({}, deployProduction, {
  //     path: '/opt/node/AlienSwap-Web-Gray',
  //     env: Object.assign({}, ENV, {
  //       PROT: 3001,
  //       SETUP_ENV: 'gray',
  //       PM2_INSTANCES: 1,
  //     }),
  //   }),
  // },
};
