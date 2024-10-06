import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createStyles,
  Group,
  GroupProps,
  Text,
  TextProps,
} from '@asuikit/core';
import IconCoin, { TIconCoin } from '@/icons/IconCoin';

import PrimaryText from './base/PrimaryText';
import { isNumber } from 'lodash';
import { prettyNumber } from '@alien-mm/utils/dist/formatter';

interface IconAndPriceProps extends GroupProps {
  coin?: string;
  coinContract?: string;
  value?: number | string | undefined;
  placeholder?: string;
  usePrimaryText?: boolean;
  groupSeparator?: boolean;
  iconPosition?: 'left' | 'right';
  compact?: Parameters<typeof prettyNumber>[2];
  textProps?: TextProps;
  iconCoinProps?: TIconCoin;
  unit?: string;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const IconAndPrice: React.FC<React.PropsWithChildren<IconAndPriceProps>> = ({
  coin = 'eth',
  value,
  placeholder = '-',
  usePrimaryText = false,
  children,
  iconPosition = 'left',
  groupSeparator,
  compact,
  textProps,
  unit,
  coinContract,
  iconCoinProps,
  ...groupProps
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  if (value == null && (!children || React.isValidElement(children))) {
    return (
      <Group noWrap spacing={2} {...groupProps}>
        {placeholder}
      </Group>
    );
  }

  const T = usePrimaryText ? PrimaryText : Text;

  return (
    <Group noWrap spacing={2} {...groupProps}>
      {iconPosition == 'left' && (
        <IconCoin
          coinContract={coinContract}
          coin={coin as any}
          {...iconCoinProps}
        />
      )}
      <T {...textProps} lineClamp={1} data-value={value}>
        <span>
          {value != null
            ? prettyNumber(value, groupSeparator, compact)
            : children}
        </span>
        {unit && <span className="ml-1">{unit}</span>}
      </T>
      {iconPosition == 'right' && (
        <IconCoin coinContract={coinContract} coin={coin as any} />
      )}
    </Group>
  );
};

export default memo(IconAndPrice);
