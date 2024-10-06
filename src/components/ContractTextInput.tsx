import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, TextInput, TextInputProps } from '@asuikit/core';
import { useValidatedState } from '@asuikit/hooks';

interface ContractTextInputProps {
  _?: any;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

// eslint-disable-next-line react/display-name
const ContractTextInput = React.forwardRef<any, any>((props, ref) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  const [{ value, lastValidValue, valid }, setValue] = useValidatedState(
    props.value,
    (val) => !val || /^0x[a-fA-F0-9]{40}$/.test(val),
    true,
  );

  useEffect(() => {
    props.onChange?.(lastValidValue);
  }, [lastValidValue, props]);

  return (
    <TextInput
      {...props}
      ref={ref}
      value={value}
      error={!valid}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
    />
  );
});

export default memo(ContractTextInput) as React.ForwardRefExoticComponent<
  TextInputProps &
    React.RefAttributes<HTMLInputElement> & {
      onChange(value: string): void;
    }
>;
