import React, { memo } from 'react';
import ProfileRadarChart from '@/components/Airdrop/ProfileStatistics';
import ProfileStatistics from '@/components/Airdrop/ProfileStatistics';
import ProfileTable from '@/components/Airdrop/ProfileTable';

function MyProfile() {
  return (
    <div className="xl-shadow h-full flex-1 rounded-[24px] bg-[#FFFFFF] p-10">
      <div className="flex flex-col gap-[30px]">
        <ProfileStatistics />
        <ProfileTable />
      </div>
    </div>
  );
}

export default memo(MyProfile);
