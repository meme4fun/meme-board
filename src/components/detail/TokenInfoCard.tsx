import { ActionIcon } from '@asuikit/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RiEarthLine, RiTwitterXLine } from 'react-icons/ri';
import { PiTelegramLogo } from 'react-icons/pi';

interface TokenInfoCardProps {
  _?: any;
}

const TokenInfoCard: React.FC<TokenInfoCardProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <div className="max-w-[110px] flex-1">
          <img
            className="block aspect-square w-full rounded-lg"
            src="https://pump.mypinata.cloud/ipfs/QmeR4tDUR1WEyZ1ApDcs7523nSBD7NeVp5bTGQJS5jM9Ac?img-width=800&img-dpr=2&img-onerror=redirectF"
            alt=""
          />
        </div>
        <div className="flex-1 text-black">
          <div className="text-lg font-bold leading-[22px]">ZEBRA</div>
          <div className="text-sm leading-[18px] text-[#666]">ZEBRA</div>
          <div className="text-base leading-5">
            {t('meme4fun.discover.ticker_by', 'Created by')}
          </div>
          <div className="text-base leading-5 underline">0xc2...0151da</div>
          <div className="mt-1 flex items-center gap-1">
            <ActionIcon size={'sm'} className="text-[#999] hover:text-black">
              <RiTwitterXLine />
            </ActionIcon>
            <ActionIcon size={'sm'} className="text-[#999] hover:text-black">
              <PiTelegramLogo />
            </ActionIcon>
            <ActionIcon size={'sm'} className="text-[#999] hover:text-black">
              <RiEarthLine />
            </ActionIcon>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="font-semibold text-black">
          <span>{t('meme4fun.discover.ticker_marketcap')}</span>
          <span>20K (33%)</span>
        </div>
        <div className="mt-2 w-full overflow-hidden rounded-full border border-black">
          <div className="h-2 bg-[#FADB06]" style={{ width: '20%' }}></div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[#666]">
        There are 674,916,675 tokens still available for sale in the bonding
        curve and there is 3.713 SOL in the bonding curve.
      </div>
    </div>
  );
};

export default memo(TokenInfoCard);
