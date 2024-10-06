import React from 'react';
import {
  createPolymorphicComponent,
  createStyles,
  Text,
  TextProps,
} from '@asuikit/core';
import { PolymorphicComponentProps } from '@asuikit/utils';

export const PresetColorStyles = {
  red: 'linear-gradient(112.37deg, #D9373A 14.58%, #E2973F 85.42%)',
  green: 'linear-gradient(112.37deg, #19B244 14.58%, #1D94C6 85.42%)',
};

interface PrimaryTextExtProps {
  disabled?: boolean;
  color?: string;
  backgroundImage?: string;
  hover?: boolean;
  textStyle?: keyof typeof PresetColorStyles | string;
}

type PrimaryTextProps = PrimaryTextExtProps & TextProps;

const useStyles = createStyles((theme, props: any) => {
  const colors = theme.colors;
  const presetBackground =
    PresetColorStyles[props.textStyle ?? ''] || props.textStyle;
  return {
    text: {
      background: presetBackground || colors.Brand1,
      backgroundClip: 'text',
      textFillColor: 'transparent',
      // wordBreak: 'break-all',
      cursor: !!props?.onClick ? 'pointer' : 'inherit',
      color: '#4776E6',
    },
    hover: {
      cursor: !!props?.onClick ? 'pointer' : 'inherit',
      // wordBreak: 'break-all',
      '&:hover': {
        background: presetBackground || colors.Brand1,
        backgroundClip: 'text',
        textFillColor: 'transparent',
        // wordBreak: 'break-all',
        cursor: !!props.onClick ? 'pointer' : 'inherit',
        color: '#8E54E9',
      },
    },
  };
});
const PrimaryText = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PrimaryTextProps>
>((props, ref) => {
  const { className, textStyle, ...otherProps } = props;
  const { classes, cx } = useStyles(props);
  return (
    <Text
      ref={ref}
      component="span"
      inherit={!otherProps.size}
      className={cx(
        {
          [classes.text]: !props.disabled && !props.color && !props.hover,
          [classes.hover]: props.hover,
        },
        className,
      )}
      {...otherProps}
      style={{
        color: props.color,
        backgroundImage: props.backgroundImage,
      }}
    >
      {props.children}
    </Text>
  );
});

PrimaryText.displayName = 'PrimaryText';

export default createPolymorphicComponent<'span', PrimaryTextProps>(
  PrimaryText,
);
