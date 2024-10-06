import { Alert, createStyles, Text } from '@asuikit/core';
import { Observer, observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { mainnet, sepolia, useAccount, WagmiConfig } from 'wagmi';
import config, { chains } from '@/connectors';
import LazyComponents from './LazyComponents';
import StyleProvider from '@/components/StyleProvider';
import { darkTheme, Locale, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useRouter } from 'next/router';

import { IS_TESTNET } from '@/constants';

interface DAppProviderProps {
  _?: any;
}

const useStyles = createStyles((theme) => {
  const { colors } = theme;
  return {
    WalletAlert: {
      position: 'fixed',
      top: 56,
      left: '0',
      width: '100%',
      // transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
      zIndex: 11,
      background: 'rgba(224, 49, 49)',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: 14,
    },
  };
});

const DAppProvider: React.FC<React.PropsWithChildren<DAppProviderProps>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default DAppProvider;
