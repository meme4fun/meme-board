import { IS_TESTNET } from '@/constants';
import notification from '@/utils/notification';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toHex } from 'viem';

export default function useAddHalNetwork() {
  const { t } = useTranslation();
  return useCallback(async () => {
    try {
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: toHex(IS_TESTNET ? 10241025 : 10241024),
          },
        ],
      });
    } catch (error) {}
    await window.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: toHex(IS_TESTNET ? 10241025 : 10241024),
          chainName: IS_TESTNET ? 'ALIENX Hal' : 'ALIENX',
          rpcUrls: IS_TESTNET
            ? ['https://hal-rpc.alienxchain.io/http']
            : ['https://rpc.alienxchain.io/http'],
          blockExplorerUrls: IS_TESTNET
            ? ['https://hal-explorer.alienxchain.io/']
            : ['https://explorer.alienxchain.io/'],
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
          },
        },
      ],
    });
    notification.success(
      t('add_network_tips', 'Successfully added network to your wallet'),
    );
  }, [t]);
}
