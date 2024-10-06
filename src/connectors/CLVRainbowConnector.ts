import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { STATIC_BASEURL } from '@/constants';
import { WalletConnectConnectorOptions } from '@rainbow-me/rainbowkit/dist/wallets/getWalletConnectConnector';
import { getWalletConnectUri } from '@/connectors/getWalletConnectUri';

export interface WalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

declare global {
  interface Window {
    // @ts-ignore
    clover: any;
  }
}
export const CLVWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: WalletOptions): Wallet => {
  const provider = typeof window !== 'undefined' && window['clover'];
  const isCLVInjected = Boolean(provider);

  const shouldUseWalletConnect = !isCLVInjected;
  return {
    downloadUrls: {
      android:
        'https://github.com/clover-network/clover-multichain-mobile-wallet-release/releases/latest/download/clover.apk',
      chrome:
        'https://chrome.google.com/webstore/detail/clv-wallet/nhnkbkgjikgcigadomkphalanndcapjk',
      ios: 'https://apps.apple.com/app/clover-wallet/id1570072858',
      mobile: 'https://apps.apple.com/app/clover-wallet/id1570072858',
      qrCode: 'https://clv.org/',
    },
    iconAccent: '#BDFDE2',
    iconBackground: '#fff',
    iconUrl: `${STATIC_BASEURL}/images/wallet/clvWallet.svg`,
    id: 'clv',
    installed: !shouldUseWalletConnect ? isCLVInjected : undefined,
    name: 'CLV',
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            projectId,
          })
        : new InjectedConnector({
            chains,
            options: {
              getProvider: () => provider,
            },
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, '2');
        return uri;
      };
      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://clv.org/',
            steps: [
              {
                description:
                  'We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the CLV Wallet extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
          },
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: 'https://clv.org/',
                steps: [
                  {
                    description:
                      'We recommend putting CLV Wallet on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the CLV Wallet app',
                  },
                  {
                    description:
                      'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                    step: 'create',
                    title: 'Create or Import a Wallet',
                  },
                  {
                    description:
                      'After you scan, a connection prompt will appear for you to connect your wallet.',
                    step: 'scan',
                    title: 'Tap the scan button',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
