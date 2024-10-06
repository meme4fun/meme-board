import { Tooltip } from '@asuikit/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'tabler-icons-react';

interface TokenFlaggedAlertProps {
  size?: number;
  color?: string;
}

const TokenFlaggedAlert: React.FC<TokenFlaggedAlertProps> = ({
  size = 16,
  color = '#eb5757',
}) => {
  console.log('🚀 ~ file: TokenFlaggedAlert.tsx:15 ~ size', size);
  const { t } = useTranslation();
  return (
    <Tooltip
      width={250}
      transitionProps={{ transition: 'fade', duration: 200 }}
      withArrow
      multiline
      label={t('token_flagged_tips')}
    >
      <span
        style={{
          lineHeight: 1,
          verticalAlign: 'middle',
          marginRight: '4px',
        }}
      >
        <AlertTriangle color={color} size={size} />
      </span>
    </Tooltip>
  );
};

export default memo(TokenFlaggedAlert);
