import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from '../../store/index';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Sentry from '@sentry/nextjs';
import { eventBus } from '../../lib/event';
import { _ } from '@/lib/lodash';
import { useTranslation } from 'react-i18next';
import { helper } from '@/lib/helper';
import {
  JsonRpcProvider,
  TransactionResponse,
  BaseProvider,
} from '@ethersproject/providers';

import {
  WalletClient,
  mainnet,
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useFeeData,
  useNetwork,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import { useDidName } from '@/hooks/dididHooks';
import { track, trackUserEnv } from '@/utils/track';
import { useAccountNames } from '@/hooks/useAccountNames';
import BigNumber from 'bignumber.js';
import { IS_TESTNET } from '@/constants';
import { useChainAvatar } from '@/hooks/useChainAvatar';
import { isBrowser } from '@/utils';
import { addressEqual } from '@/utils/web3Utils';

const ETHProvider = observer(() => {
  const { god, alien, setting, user } = useStore();
  const {
    address: account,
    connector,
    isConnecting,
    isReconnecting,
    status,
  } = useAccount();

  const { chain, chains } = useNetwork();

  god?.accountConnecting?.setValue?.(isConnecting);

  const feeDataRequest = useFeeData({
    cacheTime: 30_000,
    chainId: god.currentChainId,
    onSuccess(data) {
      if (data.gasPrice)
        god.currentChain?.gasPrice.setValue(
          new BigNumber(data.gasPrice.toString()),
        );
    },
  });

  useEffect(() => {
    feeDataRequest.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [god.currentChainId]);

  // const { data: ensName } = useEnsName({
  //   address: account,
  // });

  // const { data: didName } = useDidName(account);

  const ensAvatar = useChainAvatar(account);
  const chainId = chain?.id;

  // const error = '';
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient({
    chainId: god.currentChain?.chainId || god.defaultChainId,
  });

  const { data: walletClient, isError } = useWalletClient();
  if (connector) {
    helper.connector = connector;
  }

  if (isBrowser) {
    (window as any).walletClient = walletClient;
  }

  const lang = useTranslation();

  const store = useLocalObservable(() => ({
    logout() {
      alien.logout();
      disconnect();
      god.eth.connector.latestProvider.clear();
      god.currentNetwork.setAccount('');
      eventBus.emit('wallet.logout');
    },
    wrongNetwork() {
      toast.error(lang.t('wrong.network'), { id: 'wrong.network' });
    },
  }));

  const { didName, ensName, defaultDisplayName } = useAccountNames(god.account);

  useEffect(() => {
    god.didName = didName;
    god.ensName = ensName || undefined;
    god.walletDisplayName = defaultDisplayName || god.account;
  }, [defaultDisplayName, didName, ensName, god]);

  // useInterval(() => {
  //   god.currentChain?.loadGasFee();
  // }, 120000);

  useEffect(() => {
    // god.ensAvatar = ensAvatar?.toString();
    // god.ensName = ensName?.toString();
    // god.didName = didName?.toString();

    // if (chainId === god.currentChainId) {
    god.eth.publicClient = publicClient;

    god.eth.walletClient = walletClient as WalletClient;
    // }

    /* if (chainId && god) {
      console.log(
        '💬️ ~ file: index.tsx:121 ~ useEffect ~  setChain ~ val::',
        chainId,
        god.currentChainId,
      );
      if (
        god.currentNetwork.allowChains.includes(chainId) &&
        !god.currentChainId
      ) {
        god.setChain(chainId);
      } else if (!god.currentChainId) {
        god.setChain(god.defaultChainId);
      }
    } */

    god.walletChainId.setValue(chainId!);

    const hasAccountChange = account && !addressEqual(account, god.account);

    // god.currentNetwork.setAccount(account!);
    /* if (account)  */
    god.currentNetwork.setAccount(account?.toLowerCase() ?? '');

    if (hasAccountChange) {
      eventBus.emit('wallet.account.change', account, god.account ?? '');
    }
    // user.refreshAlienSwapMethBalance();
    god.currentNetwork.loadBalance();
    Sentry.setTag('account', account);

    if (account) {
      god.setShowConnecter(false);
      trackUserEnv(account);
      track('connect-wallet');
    }
    god.updateTicker.setValue(god.updateTicker?.value ?? 0 + 1);
  }, [god, chainId, account, publicClient, walletClient]);

  // useEffect(() => {
  //   eventBus.on('wallet.logout', store.logout);
  //   return () => {
  //     eventBus.off('wallet.logout', store.logout);
  //   };
  // }, [store.logout]);

  god.walletDisconnect = store.logout;

  return null;
});

export default ETHProvider;
