import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@asuikit/core';
import { useCSR } from '@/hooks/useCSR';

interface CSROnlyProps {
  _?: any;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const CSROnly: React.FC<React.PropsWithChildren<CSROnlyProps>> = ({
  children,
}) => {
  const csr = useCSR();
  if (!csr) return null;

  return <>{children}</>;
};

export default memo(CSROnly);
