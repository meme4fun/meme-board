import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useCallback } from 'react';

export const useSolanaWallet = useWallet;
export const useSolanaConnection = useConnection;

export const useSolanaAccount = () => {
  const { setVisible: setModalVisible } = useWalletModal();
  const {
    buttonState,
    onConnect,
    onDisconnect,
    publicKey,
    walletIcon,
    walletName,
  } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true);
    },
  });

  const connect = useCallback(async () => {
    console.log('💬️ ~ connect ~ buttonState:', buttonState);
    switch (buttonState) {
      case 'no-wallet':
        setModalVisible(true);
        break;
      case 'has-wallet':
        if (onConnect) {
          onConnect();
        }
        break;
    }
  }, [buttonState, onConnect, setModalVisible]);

  return {
    account: publicKey?.toString() ?? undefined,
    publicKey,
    connect,
  };
};
