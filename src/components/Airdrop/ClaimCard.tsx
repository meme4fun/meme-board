import { useTranslation } from 'react-i18next';
import { ActionIcon, Button, Divider, Group, Text } from '@asuikit/core';
import { mantissaNumber, truncateAddress } from '@/utils';
import {
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiRefreshLine,
  RiShareBoxLine,
} from 'react-icons/ri';
import { useRequest } from 'ahooks';
import {
  TaskType,
  getAirdropInfo,
  postVerifyTask,
} from '@/services/api/meme4fun.api';
import CountUp from '@/components/CountUp';
import { useEffect, useMemo, useState } from 'react';
import { find } from 'lodash';

function ClaimCard() {
  const { t } = useTranslation();
  const [startAmount, setStartAmount] = useState(0);
  const [endAmount, setEndAmount] = useState(0);

  const airdropRequest = useRequest(async () => {
    return await getAirdropInfo();
  });

  const verifyTaskRequest = useRequest(
    async (type: TaskType) => {
      const res = await postVerifyTask(type);
      if (res.verified) {
        setStartAmount(endAmount);
        setEndAmount(endAmount + res.fun);
      }
      return res;
    },
    { manual: true },
  );

  // const [twShare, asset] = useMemo(() => {
  //   if (mainnetQuest.passcardTaskList?.value) {
  //     return [
  //       find(mainnetQuest.passcardTaskList?.value, {
  //         action_type: 'PASSCARD_TW_SHARE',
  //       }),
  //       find(mainnetQuest.passcardTaskList?.value, {
  //         action_type: 'PASSCARD_ASSET_VERIFY',
  //       }),
  //     ];
  //   }
  //   return [];
  // }, [mainnetQuest.passcardTaskList?.value]);
  useEffect(() => {
    setEndAmount(airdropRequest.data?.airdrop_amount || 0);
  }, [airdropRequest.data?.airdrop_amount]);

  return (
    <div className="xl-shadow flex size-full flex-col items-center justify-around gap-5 rounded-3xl bg-[#ffffff] px-[40px] py-[30px]">
      <div className="w-full rounded-lg bg-[#F9D6071F] py-1 text-center text-xs font-semibold">
        {t('airdrop.tips', {
          coin: mantissaNumber(airdropRequest.data?.create_coins_amount),
          sol: mantissaNumber(airdropRequest.data?.trade_amount),
        })}
      </div>
      <div className="flex flex-col justify-center gap-2.5 text-center">
        <Text size={24} weight={600} lh={'28px'}>
          {t('airdrop.congrats')}
        </Text>
        <Text weight={400}>
          <Text
            component={'span'}
            className="mr-1 rounded-lg bg-[#000000] px-[6px] py-px text-xs font-normal text-[#BAFF26]"
          >
            {truncateAddress(airdropRequest.data?.user_address)}
          </Text>
          {t('airdrop.congrats_sub')}
        </Text>
      </div>
      <Text size={40} lh={'48px'} weight={800}>
        {/*{mantissaNumber(airdropRequest.data?.airdrop_amount)}*/}
        <CountUp startNum={startAmount} num={endAmount} decimals={2} />
      </Text>
      <Divider color="#0000001a" w={'100%'} h={1} />
      <div className="w-full rounded-md bg-[#95A6FF33] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <Text lineClamp={1}>{t('airdrop.task_1')}</Text>
          <div className="flex items-center justify-between gap-1">
            <ActionIcon className="hover:bg-[#95A6FF33]">
              <RiShareBoxLine color="#000000" />
            </ActionIcon>
            <ActionIcon
              className="hover:bg-[#95A6FF33]"
              loading={verifyTaskRequest.loading}
              onClick={() => {
                verifyTaskRequest.run('TASK_TYPE_CREATE_ONE_MEME');
              }}
            >
              <RiRefreshLine />
            </ActionIcon>
          </div>
        </div>
        <div className="size-5 rounded-xl bg-[#F9D607] text-center text-xs font-semibold leading-[20px]">
          Or
        </div>
        <div className="flex items-center justify-between gap-2">
          <Text lineClamp={1}>{t('airdrop.task_2')}</Text>
          <div className="flex items-center justify-between gap-1">
            <ActionIcon className="hover:bg-[#95A6FF33]">
              <RiShareBoxLine color="#000000" />
            </ActionIcon>
            <ActionIcon
              className="hover:bg-[#95A6FF33]"
              loading={verifyTaskRequest.loading}
              onClick={() => {
                verifyTaskRequest.run('TASK_TYPE_INVITE');
              }}
            >
              {/*<RiRefreshLine />*/}
              <RiCheckboxCircleFill color={'#000'} />
            </ActionIcon>
          </div>
        </div>
      </div>
      <Button
        fullWidth
        radius="md"
        size="xl"
        className="bg-[#8EF59B] text-black hover:bg-[#8EF59BE6]"
      >
        {t('airdrop.claim')}
      </Button>
    </div>
  );
}

export default ClaimCard;
