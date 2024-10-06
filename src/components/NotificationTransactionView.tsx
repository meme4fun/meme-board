import { useStore } from '@/store';
import type { TransactionResponse } from '@ethersproject/providers';
import { Button, Group, Loader, Stack, Text } from '@asuikit/core';
import { observer } from 'mobx-react-lite';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle,
  ArrowUpRightCircle,
  Check,
  Link,
} from 'tabler-icons-react';
import { ValueState } from '@/store/standard/base';
import { getNetworkByNameOrId } from '@/constants/Networks';
import { openTransactionDetails } from '@/utils/web3Utils';

type ItemProps = {
  hash: string;
  tr?: Partial<TransactionResponse & { text?: string }>;
  text?: string;
};

interface NotificationTransactionViewProps {
  hash: string;
  chainId: number;
  messageState: ValueState<string>;
  statusState: ValueState<'pending' | 'success' | 'error'>;
}

/* const NotificationTransactionItem = observer(
  (props: NotificationTransactionViewProps) => {
    const { tr } = props.item;
    const { text, hash } = tr || {};
    const { god } = useStore();
    const [status, setStatus] = React.useState<'pending' | 'success' | 'error'>(
      'pending',
    );

    const { t } = useTranslation();

    useEffect(() => {
      tr?.wait?.().then(
        (receipt) => {
          if (receipt.status) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        },
        (err) => {
          setStatus('error');
          console.error(err);
        },
      );
    }, [tr]);

    return (
      <Group noWrap spacing={4}>
        {status === 'pending' && <Loader color="white" size={16} />}
        {status === 'success' && <Check color="green" size={16} />}
        {status === 'error' && <AlertCircle color="red" size={16} />}
        <Group
          noWrap
          style={{ flexGrow: 1 }}
          sx={(theme) => ({
            flex: 1,
            overflow: 'hidden',
            cursor: 'pointer',
            ...theme.fn.hover({
              color: theme.other.colors.White1,
            }),
            '.hash': {
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          })}
          spacing={4}
          onClick={() => {
            if (hash) {
              window.open(`${god.currentChain?.explorerURL}/tx/${hash}`);
            }
          }}
        >
          <Text
            lineClamp={1}
            style={{ wordBreak: 'break-all' }}
            className="hash"
          >
            {hash || text || t('waiting_get_more_info')}
          </Text>
          {hash && <Link prefetch={false} size={16} />}
        </Group>
      </Group>
    );
  },
); */

const NotificationTransactionView: React.FC<
  NotificationTransactionViewProps
> = ({ hash, statusState, messageState, chainId }) => {
  const status = statusState.value;
  const message = messageState.value;
  const { god } = useStore();
  const { t } = useTranslation();
  return (
    <div>
      <div className="text-text-3">{message}</div>
      {hash && (
        <div className="flex justify-end mt-2">
          <Button
            onClick={() => {
              openTransactionDetails(chainId, hash);
            }}
            size="xs"
            color="grey"
          >
            {t('bid_pool.advance_deposit_check_browser')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(NotificationTransactionView);
