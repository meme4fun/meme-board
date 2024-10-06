import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  useWallet,
  useConnection,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { getConnectionUrl } from './tools';
import AutoConnectContext from './AutoConnectContext';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { isProd } from '@/constants';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

interface SolanaWalletProviderProps {
  _?: any;
}

const SolanaWalletProvider: React.FC<
  React.PropsWithChildren<SolanaWalletProviderProps>
> = ({ children }) => {
  const [network, setNetwork] = useState<any>(
    isProd ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet,
  );

  const endpoint = getConnectionUrl(network);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()], // confirmed also with `() => []` for wallet-standard only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );

  useEffect(() => {
    require('@solana/wallet-adapter-react-ui/styles.css');
  }, []);

  return (
    <AutoConnectContext>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider className="bg-[#fff]">
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </AutoConnectContext>
  );
};

export default SolanaWalletProvider;
