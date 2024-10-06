import React, { useEffect, useMemo, useRef } from 'react';
import { Checkbox, Divider, Text } from '@asuikit/core';
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';
import { useRequest } from 'ahooks';
import { getAirdropRadarChart } from '@/services/api/meme4fun.api';
import { flatMap, map, values } from 'lodash';

const RadarChart = ({ chartData }: any) => {
  const { t } = useTranslation();

  const seriesData = useMemo(() => {
    return map(chartData, 'value');
  }, [chartData]);
  console.log('chartData====', chartData);
  // const indicatorData = useMemo(() => {}, [chartData]);

  const chartRef = useRef<HTMLDivElement>(null);
  let chart: any;
  let ro: any;
  useEffect(() => {
    if (!seriesData?.length || !chartRef.current) return;
    async function init() {
      const echarts: any = await import('echarts');
      chart = echarts?.init(chartRef.current);
      const option = {
        tooltip: {
          trigger: 'axis',
        },
        radar: {
          name: {
            show: false,
          },
          radius: '100%',
          scale: false,
          indicator: [
            { name: t('profile.statistics_1'), max: 100 },
            { name: t('profile.statistics_2'), max: 100 },
            { name: t('profile.statistics_3'), max: 100 },
            { name: t('profile.statistics_4'), max: 100 },
            { name: t('profile.statistics_5'), max: 100 },
          ],
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: seriesData,
                name: '',
              },
            ],
            symbol: 'none',
            lineStyle: {
              color: 'rgba(60, 56, 245, 1)',
              width: 2,
            },
            areaStyle: {
              color: 'rgba(60, 56, 245, 0.3)',
            },
          },
        ],
      };
      chart.setOption(option);
      if (ro) {
        ro.disconnect();
      } else {
        ro = new ResizeObserver((entries) => {
          chart.resize();
        });
      }
      ro.observe(chartRef.current);
    }

    if (seriesData) {
      init();
    }
    return () => {
      if (ro) {
        ro.disconnect();
      }
      chart?.dispose();
    };
  }, [seriesData]);

  return (
    <div className="size-[169px]">
      <div
        className="chart"
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </div>
  );
};

function ProfileStatistics() {
  const { t } = useTranslation();
  const { data } = useRequest(async () => {
    const res: any = await getAirdropRadarChart();
    return res?.radar_charts;
  });

  const labelMap = useMemo(() => {
    return {
      AIRDROP_EXPECTED_VALUE: t('profile.statistics_1'),
      HELD_TICKET_COUNT: t('profile.statistics_2'),
      CREATED_TICKET_COUNT: t('profile.statistics_3'),
      WIN_RATE: t('profile.statistics_4'),
      LAUNCH_RATE: t('profile.statistics_5'),
    };
  }, [t]);

  const formattedData = useMemo(() => {
    return map(data, (item) => ({
      name: labelMap[item.label_name] || item.label_name,
      max: item.max_value || 100,
      value: item.value || 0,
    }));
  }, [data, labelMap]);

  return (
    <div className="flex justify-center gap-20">
      <RadarChart chartData={formattedData} />
      <div>
        <div className="flex w-[413px] flex-col gap-2 rounded-[8px] bg-[#95A6FF33] p-3">
          {formattedData?.map((item: any) => (
            <div key={item.name} className="flex items-center gap-4">
              <Text fw={400} size={12}>
                {item?.name}
              </Text>
              <Divider color="#000000" h={1} className="flex-1" />
              <Text fw={600} size={12}>
                {item?.value}
              </Text>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-8">
          <Checkbox
            size="xs"
            label={t('profile.statistics_6')}
            styles={{
              input: {
                '&:checked': {
                  backgroundColor: '#F9D607',
                  borderColor: 'transparent',
                },
              },
              label: {
                paddingLeft: 2,
              },
            }}
          />
          <Checkbox
            size="xs"
            label={t('profile.statistics_7')}
            styles={{
              input: {
                '&:checked': {
                  backgroundColor: '#F9D607',
                  borderColor: 'transparent',
                },
              },
              label: {
                paddingLeft: 2,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileStatistics;
