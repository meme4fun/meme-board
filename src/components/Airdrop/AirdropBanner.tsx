import { Text } from '@asuikit/core';
import { useTranslation } from 'react-i18next';

function AirdropBanner() {
  const { t } = useTranslation();
  return (
    <div className="xl-shadow flex h-[118px] justify-between rounded-3xl bg-[#BC92C0] px-[43px]">
      <img src="/images/meme/airdrop-banner-icon-1.svg" alt="" />
      <div className="flex flex-col justify-center gap-1 text-lg">
        <div className="flex gap-2 font-semibold">
          <Text>·</Text>
          {t('airdrop.banner_t1')}
        </div>
        <div className="flex gap-2 font-semibold">
          <Text>·</Text>
          {t('airdrop.banner_t2')}
        </div>
      </div>
      <img src="/images/meme/airdrop-banner-icon-2.svg" alt="" />
    </div>
  );
}

export default AirdropBanner;
