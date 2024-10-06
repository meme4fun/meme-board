import { Button, ButtonProps, createStyles } from '@mantine/core';
import React, { memo } from 'react';
import { merge } from 'lodash';

interface PrimaryButtonProps {
  shadowOffset?: number;
  activeShadowOffset?: number;
  borderWidth?: number;
  activeBg?: string;
  padding?: string;
}

const defaultColor = '#00000066';
const selectedColor = '#000000';

const useStyles = createStyles(() => {
  return {
    root: {},
  };
});

const PrimaryButton: React.FC<
  ButtonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    PrimaryButtonProps
> = (props) => {
  const { cx, classes } = useStyles();

  const {
    shadowOffset = 4,
    activeShadowOffset = 4,
    borderWidth = 4,
    activeBg,
    padding = '0 40px',
    ...restProps
  } = props;

  const bg = props.bg || '#BAFF26';

  const height = Number(props.h || 68);
  const btnHeight = height - shadowOffset * 2;
  const fontSize = 32;
  const fontWeight = 700;
  const lh = '32px';
  return (
    <Button
      unstyled
      {...restProps}
      disabled={props.loading || props.disabled}
      bg={'none'}
      styles={merge(
        {
          root: {
            width: props.fullWidth ? '100%' : 'auto',
            height,
            position: 'relative',
            padding: 0,
            cursor: 'pointer',
            '&:before': {
              content: '" "',
              position: 'absolute',
              width: '100%',
              background: '#000',
              height: btnHeight,
              borderRadius: btnHeight,
              zIndex: 1,
              right: -shadowOffset,
              bottom: 0,
            },
            '&:disabled, &[data-disabled], &[data-loading], &:active': {
              '.asuikit-Button-inner': {
                backgroundColor: bg,
                border: `${borderWidth}px solid #000000`,
                color: '#000000',
                transform: `translate3d(${activeShadowOffset}px, ${activeShadowOffset}px, 0)`,
              },

              // boxShadow: '0px 0px 0px black',
            },

            '&:active': {
              '.asuikit-Button-inner': {
                backgroundColor: props.activeBg || bg,
              },
            },
          },
          leftIcon: {
            display: 'none',
          },
          inner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize,
            fontWeight,
            lineHeight: lh,
            height: btnHeight,
            borderRadius: btnHeight,
            backgroundColor: bg,
            border: `${borderWidth}px solid #000000`,
            color: '#000000',
            padding,
            // boxShadow: '8px 8px 0px black',
            transition: 'all 0.2s ease',
            transform: `translate3d(-${shadowOffset}px, -${shadowOffset}px, 0)`,
            position: 'relative',
            zIndex: 9,
          },
        },
        props.styles,
      )}
    >
      {props.children}
    </Button>
  );
};

export default memo(PrimaryButton);
