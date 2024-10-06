import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  createStyles,
  Divider,
  Group,
  Radio,
  ScrollArea,
  Text,
} from '@asuikit/core';
import { RiRefreshLine } from 'react-icons/ri';
import { mantissaNumber, truncateAddress } from '@/utils';

const useStyle = createStyles((theme) => {
  const colors = theme.colors;
  return {
    staked: {
      backgroundColor: '#BAFF2633',
      border: '2px solid #BAFF26',
      minWidth: 255,
      height: 72,
      borderRadius: 12,
      padding: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    stakedLeft: {
      width: 60,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: 4,
      overflow: 'hidden',
    },
    stakedRight: {
      flex: 1,
    },

    unStake: {
      backgroundColor: '#EAEDFF',
      minWidth: 255,
      height: 72,
      borderRadius: 12,
      padding: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    unStakeLeft: {
      width: 60,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: 4,
      overflow: 'hidden',
    },
  };
});

interface MyPoolCardProps {
  poolAddress: string;
  funAddress: string;
  listData: any[];
  refreshData: () => void;
}

const RenderTokenItem: FC<any> = ({ pool }) => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  return (
    <div
      className={
        pool?.pool_status === 'STAKED' ? classes.staked : classes.unStake
      }
    >
      {pool?.pool_status === 'STAKED' && (
        <div className={classes.stakedLeft}>
          <Text align="center" className="ellipsis w-full">
            #{pool?.pool_id}
          </Text>
          <div className="rounded-[4px] bg-[#BAFF26] px-[6px] py-[2px]">
            <Text size={12}>{t('lp.staked')}</Text>
          </div>
        </div>
      )}
      {pool?.pool_status === 'UN_STAKED' && (
        <div className={classes.unStakeLeft}>
          <Checkbox
            radius="xl"
            variant="default"
            color="#F9D607"
            size={16}
            label={`#${pool?.pool_id}`}
            styles={{
              body: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              input: {
                '&:checked': {
                  backgroundColor: '#F9D607',
                  borderColor: 'transparent',
                },
              },
              label: {
                paddingLeft: 4,
              },
            }}
          />
        </div>
      )}
      <Divider orientation={'vertical'} color="#0000001A" />
      <div className={classes.stakedRight}>
        <div className="flex items-center justify-between">
          <Text size={12} weight={400} color="#00000066">
            {t('lp.pool_num1')}
          </Text>
          <Text size={12} weight={600}>
            {mantissaNumber(pool?.total_pool_tokens)}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Text size={12} weight={400} color="#00000066">
            {t('lp.pool_num2')}
          </Text>
          <Text size={12} weight={600}>
            {mantissaNumber(pool?.pooled_sol)}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Text size={12} weight={400} color="#00000066">
            {t('lp.pool_num3')}
          </Text>
          <Text size={12} weight={600}>
            {mantissaNumber(pool?.pooled_fun)}
          </Text>
        </div>
      </div>
    </div>
  );
};

const MyPoolCard: FC<MyPoolCardProps> = ({
  poolAddress,
  funAddress,
  listData,
  refreshData,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-[10px] rounded-xl bg-[#FEFAE1] px-3 py-[14px]">
      <div className="mb-[12px] flex items-center justify-between">
        <div className="flex items-center">
          <Text weight={600} size={20} mr={6}>
            {t('lp.pool_title')}
          </Text>
          <ActionIcon
            className="hover: bg-[#FEFAE1]"
            variant={'transparent'}
            onClick={() => {
              refreshData();
            }}
          >
            <RiRefreshLine color="#A2CFF9" size={20} />
          </ActionIcon>
        </div>
        <div className="flex items-center">
          <div className="rounded-1 ml-5 flex items-center gap-3 bg-[#FFFFFF] px-2 py-1 text-xs">
            <Text lh={'20px'}>
              Pool：
              <Text component={'span'} underline color="#3C38F5" italic>
                {truncateAddress(poolAddress)}
              </Text>
            </Text>
            <Divider
              w={1}
              h={14}
              color="#0000001a"
              orientation="vertical"
              mt={3}
            />
            <Text lh={'20px'}>
              Fun：
              <Text component={'span'} underline color="#3C38F5" italic>
                {truncateAddress(funAddress)}
              </Text>
            </Text>
          </div>
          <Button className="ml-[6px] h-[28px] bg-[#3C38F5] hover:bg-[#3C38F5]">
            {t('lp.provide')}
          </Button>
        </div>
      </div>
      <ScrollArea
        style={{ width: '100%', paddingBlock: '5px' }}
        offsetScrollbars
        scrollbarSize={10}
      >
        <Group noWrap>
          {listData?.map((item, index) => (
            <div key={index}>
              <RenderTokenItem pool={item} />
            </div>
          ))}
        </Group>
      </ScrollArea>
      <Center mt={12}>
        <Button
          size={'md'}
          w={210}
          styles={{
            root: {
              backgroundColor: '#F9D607',
              color: '#000000',
              fontSize: 16,
              '&:hover': {
                backgroundColor: '#F9D607',
                opacity: 0.8,
              },
            },
          }}
        >
          Stake
        </Button>
      </Center>
    </div>
  );
};

export default MyPoolCard;
