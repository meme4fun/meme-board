import React, { memo } from 'react';
import Marquee from 'react-fast-marquee';
import { useRequest } from 'ahooks';
import { getTopTips } from '@/services/api/meme4fun.api';

interface HomePageMarqueeProps {
  _?: any;
}

const HomePageMarquee: React.FC<HomePageMarqueeProps> = () => {
  const { data: marqueeList } = useRequest(async () => {
    return await getTopTips();
  });
  return (
    <Marquee className="border-y-2 bg-white-0 py-4">
      {marqueeList?.map((_item, index) => (
        <div
          key={index}
          className="mr-8 flex items-center gap-1 font-semibold text-[#0B132A]"
        >
          <span>#{_item?.ticker}</span>
          <img
            src={_item?.image_uri}
            alt=""
            className="block size-5 rounded-[4px]"
          />
          <span>{_item.name}</span>
          <span className="text-[#3C38F5]">
            +{_item.price_24h_change.toFixed(2)}%
          </span>
        </div>
      ))}
    </Marquee>
  );
};

export default memo(HomePageMarquee);
