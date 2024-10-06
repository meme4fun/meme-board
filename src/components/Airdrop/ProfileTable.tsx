import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Text } from '@asuikit/core';
import { useRequest } from 'ahooks';
import { getHoldTickerList } from '@/services/api/meme4fun.api';
import { observer } from 'mobx-react-lite';
import { AsDataTableV2 } from '@alien-mm/uikit';
interface ProfileTableProps {
  _?: any;
}

const OwnedTable: React.FC<ProfileTableProps> = () => {
  const { t } = useTranslation();
  const columns = useMemo<any[]>(
    () => [
      {
        key: 'name',
        title: t('profile.owned_table_h_1'),
        fr: '149px',
        render: (item: any, index: number) => {
          return <Text>{index}</Text>;
        },
      },
      // {
      //   key: 'trade',
      //   title: t('profile.owned_table_h_2'),
      //   fr: '149px',
      //   render: (item: any) => {
      //     return <div>1111</div>;
      //   },
      // },
      // {
      //   key: 'amount',
      //   title: t('profile.owned_table_h_3'),
      //   fr: 1,
      //   align: 'center',
      //   render: (item: any) => {
      //     return <Text>{0}</Text>;
      //   },
      // },
      // {
      //   key: 'hold',
      //   title: t('profile.owned_table_h_4'),
      //   fr: 1,
      //   align: 'center',
      //   render: (item: any) => {
      //     return (
      //       <Text>
      //         {item.referral_count} {t('users')}
      //       </Text>
      //     );
      //   },
      // },
      // {
      //   key: 'buy',
      //   title: t('profile.owned_table_h_5'),
      //   fr: 1,
      //   align: 'end',
      //   render: (item: any) => {
      //     return <Text>{item.staking_boost}</Text>;
      //   },
      // },
      // {
      //   key: 'buy',
      //   title: t('profile.owned_table_h_6'),
      //   fr: 1,
      //   align: 'end',
      //   render: (item: any) => {
      //     return <Text>{item.staking_boost}</Text>;
      //   },
      // },
    ],
    [t],
  );

  return (
    <AsDataTableV2
      columns={columns || []}
      data={[]}
      pagination={false}
      loading={false}
      headerSx={{
        fontSize: 14,
        color: '#808080',
        lineHeight: '32px',
        background: '#95A6FF33',
        borderRadius: '8px',
        gap: 0,
        paddingLeft: 8,
        paddingRight: 8,
      }}
      tdSx={{
        padding: '6px 0px',
        fontSize: 14,
      }}
      rowSx={{
        height: 48,
        columnGap: 0,
        paddingLeft: 8,
        paddingRight: 8,
        '&:nth-child(even)': {
          background: '#95A6FF33',
          borderRadius: 8,
        },
      }}
    />
  );
};

const CreateTable = () => {
  const { t } = useTranslation();
  const columns = useMemo<any[]>(
    () => [
      {
        key: 'name',
        title: t('profile.created_table_h_1'),
        fr: '149px',
        render: (item: any, index: number) => {
          return <Text>name</Text>;
        },
      },
      {
        key: 'trade',
        title: t('profile.created_table_h_2'),
        fr: '149px',
        render: (item: any) => {
          return <div>1111</div>;
        },
      },
      {
        key: 'amount',
        title: t('profile.created_table_h_3'),
        fr: 1,
        align: 'center',
        render: (item: any) => {
          return <Text>{0}</Text>;
        },
      },
      {
        key: 'hold',
        title: t('profile.created_table_h_4'),
        fr: 1,
        align: 'center',
        render: (item: any) => {
          return (
            <Text>
              {item.referral_count} {t('users')}
            </Text>
          );
        },
      },
      {
        key: 'buy',
        title: t('profile.created_table_h_5'),
        fr: 1,
        align: 'end',
        render: (item: any) => {
          return <Text>{item.staking_boost}</Text>;
        },
      },
      {
        key: '',
        title: '',
        fr: 1,
        align: 'end',
        render: (item: any) => {
          return <Text>{t('profile.created_table_link')}</Text>;
        },
      },
    ],
    [],
  );

  return (
    <AsDataTableV2
      columns={columns}
      data={[]}
      pagination={true}
      loading={false}
      headerSx={{
        fontSize: 14,
        color: '#808080',
        lineHeight: '32px',
        background: '#95A6FF33',
        borderRadius: '8px',
        gap: 0,
        paddingLeft: 8,
        paddingRight: 8,
      }}
      tdSx={{
        padding: '6px 0px',
        fontSize: 14,
      }}
      rowSx={{
        height: 48,
        columnGap: 0,
        paddingLeft: 8,
        paddingRight: 8,
        '&:nth-child(even)': {
          background: '#95A6FF33',
          borderRadius: 8,
        },
      }}
    />
  );
};

const ProfileTable: React.FC<ProfileTableProps> = () => {
  const { t } = useTranslation();
  const holdTickersRequest = useRequest(async () => {
    return await getHoldTickerList();
  });
  console.log(holdTickersRequest.data);
  return (
    <Tabs
      variant="default"
      defaultValue={'owned'}
      styles={{
        tabsList: {
          gap: 24,
        },
        tab: {
          color: '#808080',
          height: 48,
          fontSize: 16,
          fontWeight: 600,
          paddingLeft: 0,
          '&[data-active], &[data-hover]': {
            color: '#000000 !important',
            borderBottomColor: '#000000 !important',
          },
        },
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="owned">{t('profile.tab_1')}</Tabs.Tab>
        <Tabs.Tab value="created">{t('profile.tab_2')}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="owned" pt="xs">
        {/*<OwnedTable />*/}owned
      </Tabs.Panel>
      <Tabs.Panel value="created" pt="xs">
        {/*<CreateTable />*/}created
      </Tabs.Panel>
    </Tabs>
  );
};

export default observer(ProfileTable);
