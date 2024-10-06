import { Table } from '@asuikit/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { mantissaNumber } from '@/utils';

const TradeRewardTable = ({ tableData }: any) => {
  console.log(tableData);
  const { t } = useTranslation();

  return (
    <Table withColumnBorders withBorder align={'center'} mt={16}>
      <thead>
        <tr>
          <th className="!text-center">{t('reward.th_1')}</th>
          <th className="!text-center">{t('reward.th_2')}</th>
          <th className="!text-center">{t('reward.th_3')}</th>
          <th className="!text-center">{t('reward.th_4')}</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((row) => (
          <tr key={row.epoch}>
            <td className="max-w-[144px] overflow-hidden text-ellipsis !text-center">
              {row.epoch}
            </td>
            <td className="max-w-[144px] overflow-hidden text-ellipsis !text-center">
              {mantissaNumber(row.period_quantity)}
            </td>
            <td className="max-w-[144px] overflow-hidden text-ellipsis !text-center">
              {mantissaNumber(row.total_weekly_release)}
            </td>
            <td className="max-w-[144px] overflow-hidden text-ellipsis !text-center">
              {mantissaNumber(row.total_daily_release)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TradeRewardTable;
