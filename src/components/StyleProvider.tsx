import { MantineProvider, MantineProviderProps } from '@asuikit/core';
import { observer } from 'mobx-react-lite';
import React from 'react';

const StyleProvider: React.FC<
  MantineProviderProps & {
    v2?: boolean;
    colorScheme?: string;
    forceColorScheme?: 'dark' | 'light';
  }
> = ({ v2 = true, colorScheme = 'light', forceColorScheme, ...props }) => {
  return (
    <MantineProvider
      // theme={store.colorScheme === 'light' ? light : dark}
      {...props}
    />
  );
};

export default observer(StyleProvider);
