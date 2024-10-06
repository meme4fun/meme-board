import { Chain } from 'viem';
import { BaseConnector, BaseConnectorOptions, getProviderFn } from './base';

export class OKXConnector extends BaseConnector {
  readonly id = 'okxwallet';

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[];
    options?: BaseConnectorOptions;
  } = {}) {
    super({
      chains,
      options: {
        getProvider: getProviderFn('okxwallet', 'isOkxWallet'),
        name: 'OKX Wallet',
      },
    });
  }
}

// import { InjectedConnector } from 'wagmi/connectors/injected';

// import type { Ethereum, InjectedConnectorOptions } from '@wagmi/core';
// import {
//   ConnectorNotFoundError,
//   UserRejectedRequestError,
//   RpcError,
//   ResourceUnavailableError,
// } from '@wagmi/core';

// import { Chain, Client } from 'wagmi';
// import { getChain } from './chains';

// // @ts-ignore
// export type MetaMaskConnectorOptions = Pick<
//   InjectedConnectorOptions,
//   // @ts-ignore
//   'shimChainChangedDisconnect' | 'shimDisconnect'
// > & {
//   /**
//    * While "disconnected" with `shimDisconnect`, allows user to select a different MetaMask account (than the currently connected account) when trying to connect.
//    */
//   UNSTABLE_shimOnConnectSelectAccount?: boolean;
// };

// export class OKXConnector extends InjectedConnector {
//   readonly id = 'okxwallet';
//   readonly name = 'OKX Wallet';
//   readonly ready =
//     typeof window != 'undefined' && !!this.#findProvider(window.okxwallet);

//   #provider?: Window['okxwallet'];

//   #UNSTABLE_shimOnConnectSelectAccount: MetaMaskConnectorOptions['UNSTABLE_shimOnConnectSelectAccount'];

//   getClient: () => Client;

//   constructor({
//     chains,
//     options: options_,
//     getClient,
//   }: {
//     chains?: Chain[];
//     options?: MetaMaskConnectorOptions;
//     getClient: () => Client;
//   }) {
//     const options = {
//       name: 'okxwallet',
//       shimDisconnect: true,
//       shimChainChangedDisconnect: true,
//       ...options_,
//     };

//     super({
//       chains,
//       options,
//     });
//     this.getClient = getClient;
//     this.#UNSTABLE_shimOnConnectSelectAccount =
//       options.UNSTABLE_shimOnConnectSelectAccount;
//   }

//   // async connect({ chainId }: { chainId?: number } = {}) {
//   //   try {
//   //     const provider = await this.getProvider();
//   //     if (!provider) throw new ConnectorNotFoundError();

//   //     if (provider.on) {
//   //       provider.on('accountsChanged', this.onAccountsChanged);
//   //       provider.on('chainChanged', this.onChainChanged);
//   //       provider.on('disconnect', this.onDisconnect);
//   //     }

//   //     this.emit('message', { type: 'connecting' });

//   //     // Attempt to show wallet select prompt with `wallet_requestPermissions` when
//   //     // `shimDisconnect` is active and account is in disconnected state (flag in storage)
//   //     if (
//   //       this.#UNSTABLE_shimOnConnectSelectAccount &&
//   //       this.options?.shimDisconnect &&
//   //       !this.getClient().storage?.getItem(this.shimDisconnectKey)
//   //     ) {
//   //       const accounts = await provider
//   //         .request({
//   //           method: 'eth_accounts',
//   //         })
//   //         .catch(() => []);
//   //       const isConnected = !!accounts[0];
//   //       if (isConnected)
//   //         await provider.request({
//   //           method: 'wallet_requestPermissions',
//   //           params: [{ eth_accounts: {} }],
//   //         });
//   //     }

//   //     const account = await this.getAccount();
//   //     // Switch to chain if provided
//   //     let id = await this.getChainId();
//   //     let unsupported = this.isChainUnsupported(id);
//   //     if (chainId && id !== chainId) {
//   //       const chain = await this.switchChain(chainId);
//   //       id = chain.id;
//   //       unsupported = this.isChainUnsupported(id);
//   //     }

//   //     if (this.options?.shimDisconnect)
//   //       this.getClient().storage?.setItem(this.shimDisconnectKey, true);

//   //     return { account, chain: { id, unsupported }, provider };
//   //   } catch (error) {
//   //     if (this.isUserRejectedRequestError(error))
//   //       throw new UserRejectedRequestError(error);
//   //     if ((<RpcError>error).code === -32002)
//   //       throw new ResourceUnavailableError(error);
//   //     throw error;
//   //   }
//   // }

//   async getProvider() {
//     if (typeof window !== 'undefined') {
//       // TODO: Fallback to `ethereum#initialized` event for async injection
//       // https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=
//       this.#provider = this.#findProvider(window.okxwallet);
//     }
//     return this.#provider;
//   }

//   #getReady(ethereum?: Ethereum) {
//     if (!ethereum) return;
//     const isOkxWallet = !!(ethereum as any)?.isOkxWallet;
//     if (!isOkxWallet) return;
//     // Brave tries to make itself look like MetaMask
//     // Could also try RPC `web3_clientVersion` if following is unreliable
//     if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return;
//     if (ethereum.isTokenPocket) return;
//     if (ethereum.isTokenary) return;
//     return ethereum;
//   }

//   #findProvider(ethereum?: Ethereum) {
//     if (ethereum?.providers) return ethereum.providers.find(this.#getReady);
//     return this.#getReady(ethereum);
//   }
// }
