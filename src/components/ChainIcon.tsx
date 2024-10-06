import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarProps, createStyles } from '@asuikit/core';
import { NetWorkConfigType } from '@/constants/Networks/type';
import { isFunction } from 'lodash';

interface ChainIconProps extends AvatarProps {
  network: NetWorkConfigType;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const ChainIcon: React.FC<ChainIconProps> = ({ network, ...avatarProps }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  return (
    <Avatar
      radius={'xl'}
      {...avatarProps}
      styles={(theme, ...args) => {
        const inputTheme = isFunction(avatarProps?.styles)
          ? avatarProps.styles(theme, ...args)
          : avatarProps?.styles ?? {};

        return {
          ...inputTheme,
          image: {
            objectFit: 'contain',
            borderRadius: '100%',
            border: '1px solid',
            borderColor: theme.colors.line[1],
            background: network.logoBackgroundColor ?? 'transparent',
            ...inputTheme.image,
          },
          placeholder: {
            background: network.logoBackgroundColor ?? '#000',
            color: '#fff',
            fontSize: theme.fontSizes[avatarProps?.size ?? 'xl'],
            border: '1px solid',
            borderColor: theme.colors.line[1],
            ...inputTheme.placeholder,
          },
        };
      }}
      src={network.logoUrl}
      className={cx('ChainIcon', classes.root)}
    >
      {network.name[0].toUpperCase()}
    </Avatar>
  );
};

export default memo(ChainIcon);
