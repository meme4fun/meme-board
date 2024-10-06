import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  ActionIconProps,
  CopyButton,
  CopyButtonProps,
  Tooltip,
  createStyles,
} from '@asuikit/core';
import { MdDownloadDone } from 'react-icons/md';
import { ASIconCopy } from '@/icons/as';

interface AsCopyButtonProps extends Omit<CopyButtonProps, 'children'> {
  iconSize?: string | number;
  actionIconProps?: ActionIconProps;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const AsCopyButton: React.FC<React.PropsWithChildren<AsCopyButtonProps>> = ({
  iconSize = '1em',
  actionIconProps,
  children,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  if (children) {
    return (
      <CopyButton timeout={1500} {...props}>
        {({ copy, copied }) => (
          <Tooltip
            withinPortal
            transitionProps={{ transition: 'slide-down' }}
            opened={copied}
            label={t('main.copy_success')}
          >
            <div onClick={copy}>{children}</div>
          </Tooltip>
        )}
      </CopyButton>
    );
  }

  return (
    <CopyButton timeout={1000} {...props}>
      {({ copy, copied }) => (
        <ActionIcon
          size={24}
          onClick={copy}
          color="gray.5"
          {...actionIconProps}
        >
          {copied ? (
            <MdDownloadDone size={iconSize} />
          ) : (
            <ASIconCopy size={iconSize} />
          )}
        </ActionIcon>
      )}
    </CopyButton>
  );
};

export default memo(AsCopyButton);
