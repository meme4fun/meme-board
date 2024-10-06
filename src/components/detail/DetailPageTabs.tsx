import React, { memo } from 'react';
import PrimaryButton from '../page/PrimaryButton';
import { useTranslation } from 'react-i18next';

interface DetailPageTabsProps {
  _?: any;
}

const DetailPageTabs: React.FC<DetailPageTabsProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-end gap-4">
      <PrimaryButton
        h={32}
        bg="#F9D607"
        borderWidth={2}
        styles={{
          inner: {
            fontSize: 12,
            fontWeight: 600,
            padding: '0 12px',
          },
        }}
        shadowOffset={2}
        activeShadowOffset={2}
      >
        {t('meme4fun.discover.ticker_tab_1', 'K Line')}
      </PrimaryButton>
      <PrimaryButton
        h={32}
        bg="#fff"
        borderWidth={2}
        styles={{
          inner: {
            fontSize: 12,
            fontWeight: 600,
            padding: '0 12px',
          },
        }}
        shadowOffset={2}
        activeShadowOffset={2}
      >
        {t('meme4fun.discover.ticker_tab_2', 'Trade')}
      </PrimaryButton>
      <PrimaryButton
        h={32}
        bg="#fff"
        borderWidth={2}
        styles={{
          inner: {
            fontSize: 12,
            fontWeight: 600,
            padding: '0 12px',
          },
        }}
        shadowOffset={2}
        activeShadowOffset={2}
      >
        {t('meme4fun.discover.ticker_tab_3', 'Comments')}
      </PrimaryButton>
      <PrimaryButton
        h={32}
        bg="#fff"
        borderWidth={2}
        styles={{
          inner: {
            fontSize: 12,
            fontWeight: 600,
            padding: '0 12px',
          },
        }}
        shadowOffset={2}
        activeShadowOffset={2}
      >
        {t('meme4fun.discover.ticker_tab_4', 'Top Holders')}
      </PrimaryButton>
    </div>
  );
};

export default memo(DetailPageTabs);
