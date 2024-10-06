import AirdropBanner from '@/components/Airdrop/AirdropBanner';
import StatsCard from '@/components/Airdrop/StatsCard';
import { Button, Text } from '@asuikit/core';
import { Trans, useTranslation } from 'react-i18next';
import React, { useMemo, useState } from 'react';
import { mantissaNumber } from '@/utils';
import TradeRewardTable from '@/components/Airdrop/TradeRewardTable';
import TradeRewardModal from '@/components/Airdrop/TradeRewardModal';
import { useDisclosure } from '@asuikit/hooks';
import { useRequest } from 'ahooks';
import { getTradeRewardInfo } from '@/services/api/meme4fun.api';

function TradeReward() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [maxNumber, setMaxNumber] = useState<number>(0);

  const { data } = useRequest(async () => {
    return await getTradeRewardInfo();
  });

  return (
    <div className="flex h-full flex-col gap-8">
      <AirdropBanner />
      <div className="flex flex-1 gap-8">
        <div className="xl-shadow size-full flex-1 rounded-3xl bg-[#FFFFFF] px-8 py-6">
          <div className="flex items-center justify-between">
            <Text size={20} weight={600}>
              {t('reward.title')}
              <Text
                component={'span'}
                underline
                size={12}
                color="#3C38F5"
                ml={5}
                weight={400}
                className="cursor-pointer"
              >
                {t('reward.underline_text')}
              </Text>
            </Text>
            <div className="text-xs font-normal text-[#4F5665]">
              <Text>{t('reward.sub_text1')}</Text>
              <Trans
                t={t}
                i18nKey={'reward.sub_text2'}
                components={{
                  a: (
                    <Text
                      component="span"
                      underline
                      color="#3C38F5"
                      className="cursor-pointer"
                    ></Text>
                  ),
                }}
              />
            </div>
          </div>
          <div className="mt-2 grid h-[56px] grid-cols-3 rounded-lg bg-[#95A6FF33]">
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('reward.num_1')}
              </Text>
              <Text>${mantissaNumber(data?.revenues_of_day)}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('reward.num_2')}
              </Text>
              <Text>${mantissaNumber(data?.create_fee)}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('reward.num_3')}
              </Text>
              <Text>${mantissaNumber(data?.trade_fee)}</Text>
            </div>
          </div>
          <TradeRewardTable tableData={data?.epochs || []} />
          <div className="mt-4 flex justify-between">
            <div>
              <Text weight={600} size={12}>
                {t('reward.trade_fee_boost')}
              </Text>
              <Text weight={400} size={14}>
                {t('reward.trade_fee_sub')}
              </Text>
            </div>
            <div className="flex items-center gap-[33px]">
              <Text color={'#F22B5E'}>{data?.trade_fee_boost}</Text>
              <Button
                w={170}
                size="sm"
                className="bg-[#F9D607] text-black hover:bg-[#F9D607]"
              >
                {t('reward.trade_b')}
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex w-[68%] justify-between">
              <Text weight={600} size={12}>
                {t('reward.rewards')}
              </Text>
              <Text weight={400} size={14}>
                {t('reward.available')}
                <Text component="span" ml={4}>
                  {data?.available_fun} / {data?.locking_fun} $FUN
                </Text>
              </Text>
            </div>
            <div className="flex gap-2">
              <div className="flex h-[40px] w-[70%] items-center justify-between rounded-lg bg-bg-3 px-3">
                <Text color={'text.3'}>{maxNumber}</Text>
                <Text
                  color={'#3C38F5'}
                  className="cursor-pointer"
                  onClick={() => setMaxNumber(data?.available_fun || 0)}
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
      <TradeRewardModal opened={opened} onClose={close} />
    </div>
  );
}

export default TradeReward;
