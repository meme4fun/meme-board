import AirdropBanner from '@/components/Airdrop/AirdropBanner';
import StatsCard from '@/components/Airdrop/StatsCard';
import ClaimCard from '@/components/Airdrop/ClaimCard';

function AirdropComponent() {
  return (
    <div className="flex h-full flex-col gap-8">
      <AirdropBanner />
      <div className="flex h-[450px] flex-1 gap-8">
        <div className="flex-1">
          <ClaimCard />
        </div>
        <StatsCard />
      </div>
    </div>
  );
}

export default AirdropComponent;
