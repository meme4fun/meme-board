import React, { InputHTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, InputProps, createStyles } from '@asuikit/core';
import { useMemoizedFn } from 'ahooks';
import { useInputState } from '@asuikit/hooks';
import { PolymorphicComponentProps } from '@asuikit/utils';
import { IMaskInput, IMaskInputProps } from 'react-imask';

interface PriceInputV2Props
  extends Omit<PolymorphicComponentProps<'input', InputProps>, 'onChange'> {
  max?: number;
  min?: number;
  onChange?: (val: number) => void;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();
  return false;
};
const PriceInputV2: React.FC<PriceInputV2Props> = ({
  className,
  max,
  min,
  onChange,
  ...inputProps
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  const handleKeydown = useMemoizedFn(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (['e', '+', '-'].includes(e.key)) {
        e.preventDefault();
        return false;
      }
    },
  );

  return (
    <div className="relative">
      <Input<any>
        {...inputProps}
        component={IMaskInput}
        mask="num"
        blocks={{
          num: {
            mask: Number,
            scale: 5,
            signed: false,
            thousandsSeparator: ' ',
            padFractionalZeros: false,
            normalizeZeros: true,
            radix: '.',
            mapToRadix: ['.'],
            // additional number interval options (e.g.)
            min: min || 0,
            max: max || Number.MAX_SAFE_INTEGER,
          },
        }}
        onComplete={(v) => {
          onChange?.(v);
        }}
        // mask="num ETH"
        // lazy={false}
        // blocks={{
        //   num: {
        //     mask: Number,
        //     scale: 5,
        //     signed: false,
        //     thousandsSeparator: ' ',
        //     padFractionalZeros: false,
        //     normalizeZeros: true,
        //     radix: '.',
        //     mapToRadix: ['.'],
        //     // additional number interval options (e.g.)
        //     min: 0,
        //     max: Number.MAX_SAFE_INTEGER,
        //   },
        // }}
        // onChange={(...args) => {
        //   // @ts-ignore
        //   setValue(...args);
        //   inputProps?.onChange;
        // }}
        className={cx('PriceInputV2 z-10', classes.root, className)}
      />
      <div className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
};

export default memo(PriceInputV2);
