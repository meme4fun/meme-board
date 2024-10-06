import React, { memo, useState } from 'react';
import GridContainer from '../Layout/Container/GridContainer';
import HomePageMemeListSearch from './HomePageMemeListSearch';
import { Checkbox, clsx } from '@asuikit/core';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { useCSR } from '@/hooks/useCSR';
import { ImArrowUp } from 'react-icons/im';
import { RiChat2Line } from 'react-icons/ri';
import { useRequest } from 'ahooks';
import { getTickers } from '@/services/api/meme4fun.api';
import { mantissaNumber, truncateAddress } from '@/utils';
import { useRouter } from 'next/router';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface HomePageMemeListProps {
  _?: any;
}

export const ResponsiveMasonry: any = dynamic(
  () => import('react-responsive-masonry').then((mod) => mod.ResponsiveMasonry),
  { ssr: false },
);
export const Masonry: any = dynamic(() => import('react-responsive-masonry'), {
  ssr: false,
});

const HomePageMemeList: React.FC<HomePageMemeListProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [type, setType] = useState('newest');

  const csr = useCSR();

  const tickersRequest = useRequest(async () => {
    const res = await getTickers({
      name: '',
      mint_account: '',
      ticker: '',
      listed_on_dex: false,
    });
    return res;
  });

  console.log(tickersRequest.data);

  return (
    <GridContainer>
      <div className="col-span-12 flex items-center justify-between">
        <HomePageMemeListSearch />

        <div className="ml-auto flex items-center">
          <Checkbox
            color="blue"
            classNames={{
              label: 'pl-1',
              input: 'border-[3px] border-[#000] [&:checked]:border-[#000]',
            }}
            label={t('listedOnDex', 'Listed on Dex')}
          />
          <div className="ml-6 flex h-12 border-[3px] border-black bg-[#fff]">
            <div
              onClick={() => setType('newest')}
              className={clsx('center flex cursor-pointer px-8', {
                'bg-[#BAFF26]': type === 'newest',
              })}
            >
              {t('newest', 'Newest')}
            </div>
            <div
              onClick={() => setType('rising')}
              className={clsx('center flex cursor-pointer px-8', {
                'bg-[#BAFF26]': type === 'rising',
              })}
            >
              {t('5MinRising', '5 min rising')}
            </div>
            <div
              onClick={() => setType('volume')}
              className={clsx('center flex cursor-pointer px-8', {
                'bg-[#BAFF26]': type === 'volume',
              })}
            >
              {t('volume', 'Volume')}
            </div>
          </div>
        </div>
      </div>
      {csr && (
        <div className="col-span-12">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1440: 4 }}
          >
            <Masonry gutter="24px">
              {tickersRequest.data?.list?.map((ticker, index) => (
                <div
                  key={ticker.id}
                  className="rounded-3xl border-[3px] border-black bg-[#F9D607] p-6 shadow-[8px_8px_0px_#000]"
                  onClick={() => {
                    router.push(`${ticker.id}`);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="line-clamp-1 shrink break-all">
                      {ticker.name}
                    </div>
                    <div className="line-clamp-1 flex shrink-0 flex-nowrap items-center rounded-full border-2 border-black bg-[#50FF9E] px-2 py-0.5 text-sm italic">
                      +{ticker.price_24h_change.toFixed(2)}%
                      <ImArrowUp size={12} />
                    </div>
                  </div>
                  <div className="mt-4 border-2 border-black bg-[#fff]">
                    <img
                      src={ticker.img_url}
                      alt=""
                      className={`block w-full h-[${ticker.img_height}px] object-cover`}
                    />
                    <div className="flex px-1.5 py-1">
                      <div className="flex-1 text-center">
                        <div className="text-xs opacity-60">
                          {t('discover.ticker_card_1')}
                        </div>
                        <div className="font-bold text-[#3C38F5]">
                          ${mantissaNumber(ticker.market_cap_sol, 2)}k
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs opacity-60">
                          {t('discover.ticker_card_2')}
                        </div>
                        <div className="font-bold text-[#3C38F5]">
                          ${mantissaNumber(ticker.liquid, 2)}k
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs opacity-60">
                          {t('discover.ticker_card_3')}
                        </div>
                        <div className="font-bold text-[#3C38F5]">
                          {mantissaNumber(ticker.trade_count, 2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 line-clamp-3 text-xs opacity-60">
                    {ticker.desc}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        className="size-5 rounded-full"
                        src="https://pump.mypinata.cloud/ipfs/QmcXKHYsvEgXT9MDBkaSe6BFcBcspNM4aLkSgY14dVFTJf?img-width=128&img-dpr=2&img-onerror=redirect"
                        alt=""
                      />
                      <div className="text-xs font-medium">
                        {truncateAddress(
                          '0x0cb3052B442cD622Be67990a4560c358Fcf25f87',
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <RiChat2Line size={16} />
                      {ticker.comment_count}
                    </div>
                  </div>
                </div>
              ))}
              {/*<div className="h-[520px] w-[300px] bg-red-900"></div>*/}
              {/*<div className="h-[220px] w-[300px] bg-blue-900"></div>*/}
              {/*<div className="bg-red h-[520px] w-[300px]"></div>*/}
              {/*<div className="bg-red h-[520px] w-[300px]"></div>*/}
              {/*<div className="bg-red h-[520px] w-[300px]"></div>*/}
              {/*<div className="bg-red h-[520px] w-[300px]"></div>*/}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </GridContainer>
  );
};

export default memo(HomePageMemeList);
