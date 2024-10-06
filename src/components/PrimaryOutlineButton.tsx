import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps, createStyles } from '@asuikit/core';
import PrimaryText from './base/PrimaryText';
import { isString } from 'lodash';
import { PolymorphicComponentProps } from '@asuikit/utils';

interface PrimaryOutlineButtonProps
  extends PolymorphicComponentProps<'button', ButtonProps> {
  hoverHighlight?: boolean;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {
    Normal: {
      '&:not([disabled])': {
        ...theme.other.preset.gradientBorderBG(),
      },
    },
    Hover: {
      '&:hover:not([disabled])': {
        ...theme.other.preset.gradientBorderBG(),
        span: {
          background: colors.Brand1,
          backgroundClip: 'text',
          textFillColor: 'transparent',
          wordBreak: 'break-all',
        },
      },
    },
  };
});

const PrimaryOutlineButton: React.FC<PrimaryOutlineButtonProps> = ({
  children,
  disabled,
  hoverHighlight,
  ...rest
}) => {
  const { classes, cx } = useStyles();

  return (
    <Button
      {...rest}
      disabled={disabled}
      className={cx('btn', 'bbbbss', {
        [classes.Normal]: !hoverHighlight,
        [classes.Hover]: hoverHighlight,
      })}
    >
      {isString(children) ? (
        <PrimaryText disabled={disabled}>{children}</PrimaryText>
      ) : (
        children
      )}
    </Button>
  );
};

export default memo(PrimaryOutlineButton);
