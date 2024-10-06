import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  NumberInput,
  NumberInputProps,
  createStyles,
  getSize,
  rem,
  useMantineTheme,
} from '@asuikit/core';
import { PolymorphicComponentProps } from '@asuikit/utils';
import { RiAddLine, RiPulseLine, RiSubtractLine } from 'react-icons/ri';

interface AsNumberInputProps
  extends PolymorphicComponentProps<
    'input',
    Omit<NumberInputProps, 'hideControls'>
  > {
  _?: any;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const sizes = {
  xs: rem(28),
  sm: rem(36),
  md: rem(40),
  lg: rem(48),
  xl: rem(56),
};

const AsNumberInput: React.FC<AsNumberInputProps> = (props) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  const sizeNum = getSize({ size: props.size || 'md', sizes });

  const subtractDisable = useMemo(
    () => Number(props.value) <= (props.min || 1),
    [props.min, props.value],
  );

  const addDisable = useMemo(
    () => !props.max || Number(props.value) >= props.max,
    [props.max, props.value],
  );

  return (
    <div className="as-number-input inline-flex rounded border-[1px] border-solid border-line-3">
      <ActionIcon
        disabled={subtractDisable}
        variant="transparent"
        radius={0}
        className={cx('border-none', {
          'bg-line-3': subtractDisable,
        })}
        size={sizeNum}
        onClick={() => {
          if (Number(props.value) > 1)
            props?.onChange?.(Number(props.value) - 1);
        }}
      >
        <RiSubtractLine />
      </ActionIcon>
      <div
        style={{ height: sizeNum }}
        className="h-full w-[1px] bg-line-3"
      ></div>
      <NumberInput
        {...props}
        hideControls={true}
        variant="unstyled"
        styles={{
          input: {
            textAlign: 'center',
            minHeight: sizeNum,
            width: '6em',
          },
        }}
      />
      <div
        style={{ height: sizeNum }}
        className="h-full w-[1px] bg-line-3"
      ></div>
      <ActionIcon
        onClick={() => {
          props?.onChange?.(Number(props.value ?? 0) + 1);
        }}
        variant="transparent"
        disabled={addDisable}
        className={cx('border-none', {
          'bg-line-3': addDisable,
        })}
        radius={0}
        size={sizeNum}
      >
        <RiAddLine />
      </ActionIcon>
    </div>
  );
};

export default memo(AsNumberInput);
