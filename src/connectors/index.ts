import Networks, { allChains } from '@/constants/Networks';
import { configureChains, createConfig, createStorage } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import { isProd, Z_INDEX_MAX_SAFE_INTEGER } from '@/constants';
import { mainnet, noopStorage } from '@wagmi/core';
import { getClientDetector } from '@/utils/client';
import { bloctoWallet } from '@blocto/rainbowkit-connector';
import * as customWalletMap from './customWallets';
import * as walletMap from '@rainbow-me/rainbowkit/wallets';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { NetWorkConfigType } from '@/constants/Networks/type';
import { isBrowser } from '@/utils';
import { Wallet } from '@rainbow-me/rainbowkit/dist/wallets/Wallet';
import merge from 'lodash/merge';
// import { bitKeepWallet } from '@/connectors/bitgetRainbowConnector';
// import { CLVWallet } from '@/connectors/CLVRainbowConnector';
const INFURA_KEYS = [
  '9d22730e5f2e4732a1cf55aab76495f1',
  '6e49837e505141eea944534984bb3f2a',
  '7e8196cabd3d441d8284c6920749c2f8',
];
const ALCHEMY_KEYS = isProd
  ? [
      'I3UB13XMMs211xQtlr-aVp8CX7X5U-NN',
      '2GsOdFhccOZnTFITbg9_QrnWov1w6vw8',
      'buq-zqE1YMn6FQTz7hLmZF9rczCVCgu7',
    ]
  : ['SX44D2GdSY3ydPacE4KfDtWsh57Os1Ih'];

const NetworksIds = Networks.map((n) => n.id);
const othersChain = allChains.filter((c) => !NetworksIds.includes(c.id));
//
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...(Networks?.length ? Networks : [mainnet]), ...othersChain],
  [
    // alchemyProvider({ apiKey: sample(ALCHEMY_KEYS)! }),
    // infuraProvider({ apiKey: sample(INFURA_KEYS)! }),
    publicProvider(),
  ],
);

export const walletConnectProjectId = '2fed6818b8ac3ea4d54d9e0c5eb4f869';

const walletsConfig = !isBrowser
  ? []
  : global['globalConfig'].walletsConfig ?? [{ extendsKey: 'okxWallet' }];

const wallets = walletsConfig
  .map((item) => {
    const rainbowkitWallet =
      walletMap[item.wallet?.extendsKey] ||
      customWalletMap[item.wallet?.extendsKey];
    const options = merge(item.wallet?.extConfig, item.option);
    if (!rainbowkitWallet) return null;
    return rainbowkitWallet({
      projectId: item.app?.walletconnect_project_id || walletConnectProjectId,
      chains,
      options,
    });
  })
  .filter(Boolean);
if (wallets.length === 0) {
  wallets.push(
    walletMap.metaMaskWallet({
      projectId: walletConnectProjectId,
      chains,
    }),
  );
}

export const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets,
  },
]);

const config: any = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  storage: createStorage({
    storage:
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage
        : noopStorage,
    key: 'wagmi1',
  }),
  connectors,
});

/* const client = createClient({
  autoConnect: !!1,
  provider,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new CLVConnector({
      chains,
      getClient() {
        return client;
      },
    }),
    new OKXConnector({
      chains,
      getClient() {
        return client;
      },
    }),
    new BLOCTOConnector({
      chains,
      getClient() {
        return client;
      },
    }),
    new InjectedConnector({
      chains,
    }),
  ],
});
 */
export default config;
