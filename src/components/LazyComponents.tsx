import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@asuikit/core';
import dynamic from 'next/dynamic';

function importNoSSRLayComponent<T = any>(loader): React.FC<T> {
  return dynamic(loader, {
    ssr: false,
    loading: () => null,
    // suspense: true,
  }) as any;
}

const LazyComponents = {
  WalletSelector: importNoSSRLayComponent(
    () =>
      import(
        /* webpackChunkName:"dapp-provider-components" */ './Wallet/WalletSelector'
      ),
  ),
  WalletInfo: importNoSSRLayComponent(
    () =>
      import(
        /* webpackChunkName:"dapp-provider-components-need-login" */ './WalletInfo'
      ),
  ),

  SignModal: importNoSSRLayComponent(
    () =>
      import(
        /* webpackChunkName:"dapp-provider-components" */ '@/components/SignModal'
      ),
  ),
  ETHProvider: importNoSSRLayComponent(
    () =>
      import(/* webpackChunkName:"dapp-provider-components" */ './EthProvider'),
  ),
};

export default LazyComponents;
