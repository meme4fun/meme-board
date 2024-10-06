require('module-alias/register');

const { withSentryConfig } = require('@sentry/nextjs');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const path = require('path');
const env =
  process.env.BUILD_ENV || process.env.APP_ENV || process.env.NODE_ENV;
const isProdEnv = env === 'production';
const isGray = process.env.SETUP_ENV === 'gray';
const pkg = require('./package.json');

let etag_revision = '';
try {
  etag_revision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();
} catch (err) {}
etag_revision = etag_revision || process.env.commitHash;

process.env.SENTRY_RELEASE = etag_revision;

// if (process.env.NEXT_RUNTIME !== 'nodejs') process.exit();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isInstallSentry =
  process.env.NODE_ENV !== 'development' && process.env.SENTRY_AUTH_TOKEN;

const BLACK_PAGE_LIST = [
  // '/inscription',
  // '/tick',
  // '/tick/:chain/:protocol/:tick',
  // '/view/:address',
  // '/portfolio'
];

const plugins = [
  // [
  // !isInstallSentry
  //   ? undefined
  //   : [
  //       withSentryConfig,
  //       {
  //         sentry: {
  //           hideSourceMaps: false,
  //         },
  //       },
  //     ],
  // ],
  require('next-transpile-modules')(['@web3-name-sdk/core']),
  [withBundleAnalyzer, { enabled: process.env.ANALYZE === 'true' }],
  // [
  //   withLess,
  //   {
  //     lessLoaderOptions: {
  //       // additionalData(content, context) {
  //       //   cssDtsCreator.create(context.resourcePath, content).then((content) => {
  //       //     // console.log(content.tokens); // ['myClass']
  //       //     // console.log(content.formatted); // 'export const myClass: string;'
  //       //     content.writeFile(); // writes this content to "src/style.css.d.ts"
  //       //   });
  //       //   return content;
  //       // }
  //     }
  //   }
  // ]
].filter(Boolean);

const nextConfig = withPlugins(plugins, {
  slient: true,
  basePath: process.env.BASE_PATH,
  assetPrefix: process.env.BASE_PATH,
  productionBrowserSourceMaps: env !== 'production',
  experimental: {
    esmExternals: 'loose',
    granularChunks: true,
    isrMemoryCacheSize: 50 * 1024 * 1024,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  compiler: {
    // ssr and displayName are configured by default
    // styledComponents: true,
    emotion: true,
    removeConsole:
      isProdEnv && !isGray
        ? {
            exclude: ['error', 'info'],
          }
        : false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@mantine/core'] = path.resolve(
      './node_modules/@asuikit/core',
    );
    config.resolve.alias['@mantine/hooks'] = path.resolve(
      './node_modules/@asuikit/hooks',
    );

    if (isServer) {
      const originEntry = config.entry;
      config.entry = async () => {
        const entries = await originEntry();
        Object.keys(entries).forEach((key) => {
          entries[key] = ['./scripts/module-alias.js', ...entries[key]];
        });
        return entries;
      };
    }
    // console.log(
    //   '💬️ ~ file: next.config.js:98 ~ config:',
    //   config,
    //   config.entry(),
    // );
    // if (isServer) {
    //   process.exit();
    // }

    if (!isServer) {
      config.resolve.fallback.fs = false;
      if (isProdEnv) {
        const cacheGroups = config.optimization.splitChunks.cacheGroups;

        const frameworkTest = cacheGroups.framework.test;

        cacheGroups.framework.test = (module) => {
          if (
            /(mobx|ethers|i18n|axios)/.test(module.nameForCondition() || '')
          ) {
            return true;
          }
          return frameworkTest(module);
        };
      }
      config.resolve.alias['feoaServer'] = path.resolve(
        './src/services/server/feoaServer.client',
      );
    } else {
      config.resolve.alias['feoaServer'] = path.resolve(
        './src/services/server/feoaServer',
      );
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            replaceAttrValues: {
              '#000': 'currentColor',
            },
            svgProps: {
              fontSize: '{props.size}',
            },
          },
        },
      ],
    });

    // config.resolve.alias['d3-interpolate'] =
    //   'd3-interpolate/dist/d3-interpolate.min.js';
    return config;
  },
  publicRuntimeConfig: {
    ...require('./next/runtimeConfig/default'),
    ...require('./next/runtimeConfig/' + env),
    ETAG: etag_revision,
  },
  reactStrictMode: true,
  bodyParser: {
    sizeLimit: '1mb',
  },
  async rewrites() {
    return [
      {
        source: '/assets/:chain/:address',
        destination: '/collection/:chain/:address',
      },
    ].filter(Boolean);
  },
  async redirects() {
    return [
      // {
      //   source: '/alienverse',
      //   destination: '/loyalty',
      //   permanent: true,
      // },
      // block list
      ...BLACK_PAGE_LIST.map((source) => ({
        source,
        destination: '/404',
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
      {
        source: '/_next/static/',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=59',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/jin-api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
});

module.exports = nextConfig;
