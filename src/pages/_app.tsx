import 'reflect-metadata';
import React, { useEffect } from 'react';
import App from 'next/app';
import { getCookie } from 'cookies-next';

import { Notifications } from '@asuikit/notifications';
import { ModalsProvider } from '@asuikit/modals';

import '@/lib/i18n';
import GlobalStyle from '@/components/GlobalStyle';
import StyleProvider from '@/components/StyleProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';

// import PageSplashScreen from '@/components/PageSplashScreen';
import ErrorBoundary from '@/components/ErrorBoundary';

import '@/styles/global.scss';
//@ts-ignore
import { getFEOAGlobalConfig } from 'feoaServer';
import GlobalContext from '@/components/GlobalContext';
import { UniversalErrorBoundary } from '@alien-mm/uikit';
import { isBrowser } from 'framer-motion';
import SolanaWalletProvider from '@/providers/solana-wallet-provider';

const isProduction = process.env.NODE_ENV === 'production';

function GlobalApp({ Component, pageProps, colorScheme, feoaGlobalConfig }) {
  useEffect(() => {
    if (isBrowser) {
      window.globalConfig = feoaGlobalConfig;
    }
  }, [feoaGlobalConfig]);

  return (
    <GlobalContext.Provider value={{ globalConfig: feoaGlobalConfig }}>
      <SolanaWalletProvider>
        <StyleProvider
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          colorScheme={colorScheme}
        >
          <GlobalStyle />
          <ModalsProvider>
            <UniversalErrorBoundary
              discord="https://discord.gg/alienxchain"
              twitter="https://x.com/alienxchain"
              telegram="https://t.me/alienx_ainode"
            >
              <Component {...pageProps} />
              <StyleProvider
                forceColorScheme={'light'}
                colorScheme={colorScheme}
                withGlobalStyles={false}
                v2
              >
                <Notifications
                  zIndex={Number.MAX_SAFE_INTEGER}
                  position="top-center"
                />
                <Notifications
                  eventKey="transactions-notification"
                  zIndex={Number.MAX_SAFE_INTEGER}
                  position="bottom-right"
                />
              </StyleProvider>
            </UniversalErrorBoundary>
          </ModalsProvider>
        </StyleProvider>
      </SolanaWalletProvider>
      {isProduction && <GoogleAnalytics />}
    </GlobalContext.Provider>
  );
}

GlobalApp.getInitialProps = async function getInitialProps(appContext) {
  const appProps = await App.getInitialProps(appContext);

  const feoaGlobalConfig = await getFEOAGlobalConfig();

  return {
    ...appProps,
    feoaGlobalConfig,
    colorScheme: getCookie('color-scheme', appContext.ctx) || 'light',
  };
};

export function reportWebVitals({ id, name, label, value }) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'web-vital',
      eventName: name,
      event_category:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  }
}

export default GlobalApp;
