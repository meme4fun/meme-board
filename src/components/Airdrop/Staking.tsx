import AirdropBanner from '@/components/Airdrop/AirdropBanner';
import React from 'react';
import StatsCard from '@/components/Airdrop/StatsCard';
import { Button, NumberInput, Text, Tooltip } from '@asuikit/core';
import { Trans, useTranslation } from 'react-i18next';
import { mantissaNumber } from '@/utils';
import { useRequest } from 'ahooks';
import { getStakingInfo } from '@/services/api/meme4fun.api';

const RenderTooltipsLabel = () => {
  const { t } = useTranslation();
  return (
    <div className="text-wrap">
      <Text size={14} weight={400} className="flex gap-1">
        <Text>·</Text>
        {t('staking.tip1')}
      </Text>
      <Text size={14} weight={400} className="flex gap-1">
        <Text>·</Text>
        {t('staking.tip2')}
      </Text>
    </div>
  );
};

const RenderActionCard = ({ amount, buttonText, btnColor }) => {
  return (
    <div className="flex h-[116px] flex-col items-center rounded-xl bg-[#F0F0F0] p-[12px]">
      <NumberInput
        defaultValue={0}
        withAsterisk
        hideControls
        min={0}
        rightSection={<Text>MAX</Text>}
        styles={{
          input: {
            height: 34,
            fontSize: '24px',
            fontWeight: 600,
            backgroundColor: 'transparent',
            color: '#B4B4B4',
            border: 'none',
            textAlign: 'center',
          },
          rightSection: {
            fontSize: '14px',
            fontWeight: 400,
            color: '#3C38F5',
            cursor: 'pointer',
          },
        }}
      />
      <Text size={12} mt={8} color="#4F5665">
        Amount: {mantissaNumber(amount)} $FUN
      </Text>
      <Button
        fullWidth
        className={`h-[28px] bg-[${btnColor}] text-black hover:bg-[${btnColor}]`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

function Staking() {
  const { t } = useTranslation();
  const { data } = useRequest(async () => {
    return await getStakingInfo();
  });
  return (
    <div className="flex h-full flex-col gap-8">
      <AirdropBanner />
      <div className="flex flex-1 gap-8">
        <div className="xl-shadow size-full flex-1 rounded-3xl bg-[#FFFFFF] px-8 py-6">
          <div className="flex items-center justify-between">
            <Text size={20} weight={600}>
              {t('staking.title')}
              <Tooltip
                label={<RenderTooltipsLabel />}
                width={360}
                withArrow
                styles={{
                  tooltip: {
                    padding: '10px',
                    backgroundColor: '#F9D607',
                    color: '#000000',
                  },
                }}
              >
                <img
                  src="/images/meme/staking-tips.svg"
                  alt=""
                  className="ml-2"
                />
              </Tooltip>
            </Text>
            <div className="text-xs font-normal text-[#4F5665]">
              <Text>{t('staking.sub_text1')}</Text>
              <Trans
                t={t}
                i18nKey={'staking.sub_text2'}
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
          <div className="mt-2 grid h-[64px] grid-cols-3 rounded-lg bg-[#95A6FF33]">
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('staking.num_1')}
              </Text>
              <Text>${mantissaNumber(data?.available_to_claim)}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('staking.num_2')}
              </Text>
              <Text>${mantissaNumber(data?.claimed_amount)}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text weight={400} color="#4F5665">
                {t('staking.num_3')}
              </Text>
              <Text>${mantissaNumber(data?.staked_apr)}</Text>
            </div>
          </div>
          <div className="mt-[22px] grid grid-cols-2 gap-[22px]">
            <RenderActionCard
              amount={data?.stake_available_amount}
              buttonText={t('staking.button_1')}
              btnColor={'#F9D607'}
            />
            <RenderActionCard
              amount={data?.un_stake_available_amount}
              buttonText={t('staking.button_2')}
              btnColor={'#F9D607'}
            />
            <RenderActionCard
              amount={data?.available_fun_to_claim}
              buttonText={t('staking.button_3')}
              btnColor={'#8EF59B'}
            />
            <RenderActionCard
              amount={data?.available_wsol_to_claim}
              buttonText={t('staking.button_3')}
              btnColor={'#8EF59B'}
            />
          </div>
        </div>
        <StatsCard />
      </div>
    </div>
  );
}

export default Staking;
