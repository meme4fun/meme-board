// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/tracing';
import getConfig from 'next/config';
import { APP_ENV, SENTRY_DSN, ETAG } from '@/constants';

Sentry.init({
  dsn: SENTRY_DSN || 'null',
  integrations: [new BrowserTracing()],
  // Adjust this value in production, or use tracesSampler for greater control
  sampleRate: 0.7,
  tracesSampleRate: 0.1,
  maxBreadcrumbs: 10,
  // attachStacktrace: false,
  environment: APP_ENV,
  release: ETAG,
  ignoreErrors: [
    '403',
    'Network Error',
    'Transaction reverted without a reason string',
    'user rejected transaction',
    'timeout exceeded',
    'failed to meet quorum',
    'Failed to load static file',
  ],
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
// Sentry.setTag('etag', ETAG);
