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

export const gateWallet = ({
  chains,
  projectId,
  ...options
}: WalletOptions): Wallet => ({
  id: 'gateWallet',
  name: 'Gate Wallet',
  iconUrl:
    'https://lh3.googleusercontent.com/9ylT2ZbvKAtgUiQpfwRZ1abSbFSB9w_KzmvoXtADR28kAaKFN15c7VU_S-K9NiQXrhifcBGYhZZ6llcSNciNeVoocg=w128-h128-e365-rj-sc0x00ffffff',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android:
      'https://download.gateapp.org/android/release/gateio_cn1_5.6.8_50608_09082209_20230908143001_sec.apk',
    ios: 'https://apps.apple.com/gb/app/gate-io-buy-btc-eth-shib/id1294998195',
    chrome:
      'https://chrome.google.com/webstore/detail/gate-wallet/cpmkedoipcpimgecpmgpldfpohjplkpp',
    qrCode: 'https://www.gate.io/zh/mobileapp',
  },
  createConnector: () => {
    const isGateWalletInjected =
      typeof window !== 'undefined' &&
      // @ts-expect-error
      typeof window.gatewallet !== 'undefined';

    const shouldUseWalletConnect = !isGateWalletInjected;

    const connector = (
      shouldUseWalletConnect
        ? getWalletConnectConnector({ projectId, chains })
        : new InjectedConnector({
            chains,
            options: {
              // @ts-expect-error
              getProvider: () => window.gatewallet,
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
