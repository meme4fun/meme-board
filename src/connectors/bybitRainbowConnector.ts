import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export interface WalletOptions {
  projectId: string;
  chains: Chain[];
}

export const bybitWallet = ({
  chains,
  projectId,
  ...options
}: WalletOptions): Wallet => ({
  id: 'bybitWallet',
  name: 'Bybit Wallet',
  iconUrl:
    'https://lh3.googleusercontent.com/6lZG3r0XGvx62rnG9RiEV4Jut-xDViwxoqRvb5H-oboHYpPpLl5fol5p5IEfTKsyz3i9yD5TXopl60VwFKQV2ymiRg=s120',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://bybit.onelink.me/EhY6/18vwhzqj?af_qr=c',
    ios: 'https://bybit.onelink.me/EhY6/18vwhzqj?af_qr=c',
    chrome:
      'https://chromewebstore.google.com/detail/bybit-wallet/pdliaogehgdbhbnmkklieghmmjkpigpa',
    qrCode: 'https://bybit.onelink.me/EhY6/18vwhzqj?af_qr=c',
  },
  createConnector: () => {
    const isBybitWalletInjected =
      typeof window !== 'undefined' &&
      // @ts-expect-error
      typeof window.bybitWallet !== 'undefined';

    const shouldUseWalletConnect = !isBybitWalletInjected;

    const connector = (
      shouldUseWalletConnect
        ? getWalletConnectConnector({ projectId, chains })
        : new InjectedConnector({
            chains,
            options: {
              // @ts-expect-error
              getProvider: () => window.bybitWallet,
              ...options,
            },
          })
    ) as WalletConnectConnector;
    return {
      connector,

      mobile: {
        getUri: shouldUseWalletConnect
          ? async () => {
              const provider = await connector.getProvider();
              const uri = await new Promise<string>((resolve) =>
                provider.once('display_uri', resolve),
              );
              return uri;
            }
          : async () => '',
      },
      qrCode: {
        getUri: shouldUseWalletConnect
          ? async () => {
              const provider = await connector.getProvider();
              const uri = await new Promise<string>((resolve) =>
                provider.once('display_uri', resolve),
              );
              return uri;
            }
          : async () => '',
      },
    };
  },
});
