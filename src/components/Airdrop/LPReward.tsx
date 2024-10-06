import AirdropBanner from '@/components/Airdrop/AirdropBanner';
import React, { useState } from 'react';
import StatsCard from '@/components/Airdrop/StatsCard';
import { Button, Text, Tooltip } from '@asuikit/core';
import { useTranslation } from 'react-i18next';
import { mantissaNumber } from '@/utils';
import MyPoolCard from '@/components/Airdrop/MyPoolCard';
import { useRequest } from 'ahooks';
import { getFunTokensInfo, getLpRewardInfo } from '@/services/api/meme4fun.api';

function LPReward() {
  const { t } = useTranslation();
  const { data: rewardData, refresh } = useRequest(async () => {
    return await getLpRewardInfo();
  });

  const [maxClaimNumber, setMaxClaimNumber] = useState<number>(0);

  const { data: funTokenData } = useRequest(async () => {
    return await getFunTokensInfo();
  });
  return (
    <div className="flex h-full flex-col gap-8">
      <AirdropBanner />
      <div className="flex flex-1 gap-8">
        <div className="xl-shadow size-full w-[560px] flex-1 rounded-3xl bg-[#FFFFFF] px-8 py-6">
          <Text size={20} weight={600}>
            {t('lp.title')}
          </Text>
          <Text size={12} weight={400} color="#4F5665">
            {t('lp.sub_text')}
          </Text>
          <div className="mt-2 grid h-[64px] grid-cols-3 rounded-lg bg-[#95A6FF33]">
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('lp.num_1')}
              </Text>
              <Text>${mantissaNumber(funTokenData?.liquidity)}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('lp.num_2')}
              </Text>
              <Text>${mantissaNumber(funTokenData?.market_cap)}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('lp.num_3')}
              </Text>
              <Text>${mantissaNumber(funTokenData?.price)}</Text>
            </div>
          </div>
          <MyPoolCard
            funAddress={rewardData?.fun_address || ''}
            poolAddress={rewardData?.pool_address || ''}
            listData={rewardData?.pool_info_list || []}
            refreshData={refresh}
          />
          <div className="mt-4">
            <div className="flex w-[68%] justify-between">
              <Text weight={600} size={12}>
                {t('reward.rewards')}
              </Text>
              <Text weight={400} size={14}>
                {t('lp.available')}
                <Text component="span" ml={4}>
                  {mantissaNumber(rewardData?.total_reward)} $FUN
                </Text>
              </Text>
            </div>
            <div className="flex gap-2">
              <div className="flex h-[40px] w-[70%] items-center justify-between rounded-lg bg-bg-3 px-3">
                <Text color={'text.3'}>{mantissaNumber(maxClaimNumber)}</Text>
                <Text
                  color={'#3C38F5'}
                  className="cursor-pointer"
                  onClick={() => {
                    setMaxClaimNumber(rewardData?.total_reward || 0);
                  }}
                >
                  MAX
                </Text>
              </div>
              <Button
                w={170}
                size="md"
                className="bg-[#8EF59B] text-black hover:bg-[#8EF59B]"
              >
                {t('reward.claim')}
              </Button>
            </div>
          </div>
        </div>
        <StatsCard />
      </div>
    </div>
  );
}

export default LPReward;
