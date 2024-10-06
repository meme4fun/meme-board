import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Group, createStyles } from '@asuikit/core';
import { openContractAddress } from '@/utils/web3Utils';
import { IS_TESTNET, STATIC_BASEURL } from '@/constants';
import { getNetworkByNameOrId } from '@/constants/Networks';
import { useStore } from '@/store';
import { mainnet } from 'wagmi';
import { observer } from 'mobx-react-lite';

interface ChainBrowserGroupButtonProps {
  onOpen: (isOKLink: boolean) => void;
  nonsupportOKLINK?: boolean;
  type?: 'tx' | 'contract';
  xs?: boolean;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {
    root: {
      border: '1px solid #232323',
      borderRadius: '4px',
      '&.xs': {
        '.scan-item': {
          cursor: 'pointer',
          width: 18,
          height: 16,
          display: 'flex',
          borderRight: '1px solid #232323',
          ':hover': {
            background: '#232323',
          },
          '&:last-of-type': {
            borderRight: 'none',
          },
          img: {
            display: 'block',
            margin: 'auto',
            width: '12px',
            height: 12,
            borderRadius: '100%',
          },
        },
      },
      '.scan-item': {
        cursor: 'pointer',
        width: 32,
        height: 24,
        display: 'flex',
        borderRight: '1px solid #232323',
        ':hover': {
          background: '#232323',
        },
        '&:last-of-type': {
          borderRight: 'none',
        },
        img: {
          display: 'block',
          margin: 'auto',
          width: '16px',
          height: 16,
          borderRadius: '100%',
        },
      },
    },
  };
});

const ChainBrowserGroupButton: React.FC<ChainBrowserGroupButtonProps> = ({
  onOpen,
  nonsupportOKLINK,
  type,
  xs,
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  const { god } = useStore();

  const logoUrl = useMemo(() => {
    const network = getNetworkByNameOrId(god.appropriateChainId || mainnet.id);
    return network.scanLogoUrl || `${STATIC_BASEURL}/images/logo/ethscan.svg`;
  }, []);

  const nonsupportOK = useMemo(() => {
    const currentNetworkConfig = getNetworkByNameOrId(
      god.pageChainId?.value || god.currentChainId || mainnet.id,
    );
    /*  console.log(
      '💬️ ~ file: ChainBrowserGroupButton.tsx:83 ~ nonsupportOK ~ god:',
      type && !currentNetworkConfig['blockExplorers']?.oklink,
    ); */

    return (
      nonsupportOKLINK ||
      IS_TESTNET ||
      (type && !currentNetworkConfig['blockExplorers']?.oklink)
    );
  }, [god.currentChainId, god.pageChainId?.value, nonsupportOKLINK, type]);

  return (
    <Group
      noWrap
      spacing={0}
      className={cx('chain-browser-group-button text-text-1', classes.root, {
        xs,
      })}
    >
      <div onClick={() => onOpen(false)} className="scan-item">
        <img src={logoUrl} alt="" />
      </div>
      {!nonsupportOK && (
        <div onClick={() => onOpen(true)} className="scan-item">
          <img
            src={`${STATIC_BASEURL}/images/logo/logo-oklink-square.png`}
            alt=""
          />
        </div>
      )}
    </Group>
  );
};

export default observer(ChainBrowserGroupButton);
