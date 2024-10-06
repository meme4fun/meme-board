import { Center, Divider, Text } from '@asuikit/core';
import { useTranslation } from 'react-i18next';
import { mantissaNumber } from '@/utils';
import { map, trimEnd } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { useRequest } from 'ahooks';
import { getAirdropPieChart } from '@/services/api/meme4fun.api';

const CHART_COLORS = [
  '#FD7295',
  '#BC92C0',
  '#A2CFF9',
  '#886BD8',
  '#BAFF26',
  '#F9D607',
];

const RenderDoughnutChart = ({ ratioData }) => {
  console.log(ratioData);
  // ratioData = [
  //   { value: 1048, name: 'Search Engine' },
  //   { value: 735, name: 'Direct' },
  //   { value: 580, name: 'Email' },
  //   { value: 484, name: 'Union Ads' },
  //   { value: 300, name: 'Video Ads' },
  //   { value: 300, name: 'Video 22' },
  // ];
  const sections = ratioData?.map((item) => {
    return {
      value: trimEnd(item.value, '%'),
      name: item.name,
    };
  });

  const chartRef = useRef<HTMLDivElement>(null);
  let chart: any;
  let ro: any;
  useEffect(() => {
    if (!sections?.length || !chartRef.current) return;

    async function init() {
      const echarts: any = await import('echarts');
      chart = echarts?.init(chartRef.current);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%',
          backgroundColor: '#000000',
          borderColor: '#000000',
          padding: [4, 8],
          textStyle: {
            color: '#F9D607',
          },
        },
        color: CHART_COLORS,
        legend: {
          show: false,
        },
        series: [
          {
            type: 'pie',
            radius: '90%',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'inside',
            },
            center: ['50%', '50%'],
            emphasis: { label: { show: false } },
            labelLine: {
              show: true,
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#000000',
            },
            data: sections,
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

    if (sections) {
      init();
    }
    return () => {
      if (ro) {
        ro.disconnect();
      }
      chart?.dispose();
    };
  }, [sections, ratioData]);

  return <div ref={chartRef} style={{ width: '220px', height: '220px' }}></div>;
};

function StatsCard() {
  const { t } = useTranslation();

  const labelMap = useMemo(() => {
    return {
      AIRDROP_EXPECTED_VALUE: t('profile.statistics_1'),
      HELD_TICKET_COUNT: t('profile.statistics_2'),
      CREATED_TICKET_COUNT: t('profile.statistics_3'),
      WIN_RATE: t('profile.statistics_4'),
      LAUNCH_RATE: t('profile.statistics_5'),
    };
  }, [t]);

  const { data } = useRequest(async () => {
    return await getAirdropPieChart();
  });

  const formattedPieData = useMemo(() => {
    return map(data?.pie_info, (item) => ({
      name: item.label_name,
      value: item.value || 0,
    }));
  }, [data]);

  return (
    <div className="xl-shadow flex h-full w-[312px] flex-col rounded-3xl bg-[#ffffff] px-[22px] py-8">
      <div className="flex flex-col gap-[10px]">
        <Text weight={600} size={20}>
          {t('piechart.title')}
        </Text>
        <div className="flex flex-col gap-1 rounded-lg bg-[#95A6FF33] px-2.5 py-2">
          <div className="flex justify-between">
            <Text color="#4F5665" weight={400}>
              {t('piechart.num_1')}
            </Text>
            <Text>{mantissaNumber(data?.total_users)}</Text>
          </div>
          <div className="flex justify-between">
            <Text color="#4F5665" weight={400}>
              {t('piechart.num_2')}
            </Text>
            <Text>{mantissaNumber(data?.total_revenues)}</Text>
          </div>
          <div className="flex justify-between">
            <Text color="#4F5665" weight={400}>
              {t('piechart.num_3')}
            </Text>
            <Text>{mantissaNumber(data?.total_staked_fun)}</Text>
          </div>
          <div className="flex justify-between">
            <Text color="#4F5665" weight={400}>
              {t('piechart.num_4')}
            </Text>
            <Text>{mantissaNumber(data?.estimated_apr_percentage)}</Text>
          </div>
        </div>
        <Divider color="#0000001a" mt={12} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <RenderDoughnutChart ratioData={formattedPieData} />
      </div>
    </div>
  );
}

export default StatsCard;
