import globalStyles from '@/styles/globalStyles';
import { Global } from '@asuikit/core';
import React, { memo } from 'react';

const GlobalStyle = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyle;
