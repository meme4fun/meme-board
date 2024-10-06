import React, { useEffect, useMemo, useState } from 'react';
import DAppProvider from '@/components/DAppProvider';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { AppShell } from '@asuikit/core';
import { STATIC_BASEURL } from '@/constants';
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import GridContainer from '@/components/Layout/Container/GridContainer';
import Sidebar from '@/components/Airdrop/Sidebar';
import MyProfile from '@/components/Airdrop/MyProfile';
import HomePageMarquee from '@/components/home/HomePageMarquee';
import { useRouter } from 'next/router';
import CustomModal from '@/components/page/CustomModal';
import { useDisclosure } from '@asuikit/hooks';
import EarnFunModal from '@/components/Airdrop/EarnFunModal';
import AirdropComponent from '@/components/Airdrop';
import TradeReward from '@/components/Airdrop/TradeReward';
import Staking from '@/components/Airdrop/Staking';
import LPReward from '@/components/Airdrop/LPReward';

function AirdropPage() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const sidebarItems = useMemo(() => {
    return [
      { label: t('side.menu_1'), value: 'profile', active: true },
      { label: t('side.menu_2'), value: 'airdrop', active: true },
      { label: t('side.menu_3'), value: 'trade', active: true },
      { label: t('side.menu_4'), value: 'staking', active: true },
      { label: t('side.menu_5'), value: 'lp', active: true },
    ];
  }, []);

  const [selectedValue, setSelectedValue] = useState('profile');

  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes('airdrop')) {
      setSelectedValue('airdrop');
    } else {
      setSelectedValue('profile');
    }
  }, [router.pathname]);

  const handleChange = (newValue: React.SetStateAction<string>) => {
    setSelectedValue(newValue);
    open();
  };

  return (
    <DAppProvider>
      <SEO />
      <AppShell
        padding={0}
        styles={(theme) => ({
          main: {
            backgroundImage: `url(${STATIC_BASEURL}/images/main-bg.png)`,
            backgroundColor: '#A2CFF9',
            backgroundSize: 'cover',
          },
        })}
      >
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <HomePageMarquee />
        <GridContainer className="min-h-[calc(100vh-196px)] px-0 pb-[5%] pt-6">
          <Sidebar
            onValueChange={handleChange}
            options={sidebarItems}
            selectValue={selectedValue}
          />
          <div className="col-span-9">
            {selectedValue === 'profile' && <MyProfile />}
            {selectedValue === 'airdrop' && <AirdropComponent />}
            {selectedValue === 'trade' && <TradeReward />}
            {selectedValue === 'staking' && <Staking />}
            {selectedValue === 'lp' && <LPReward />}
          </div>
          {/*<CustomModal*/}
          {/*  text={'View in My Profile - Ticker Owned'}*/}
          {/*  onClose={close}*/}
          {/*  onConfirm={() => {*/}
          {/*    close();*/}
          {/*  }}*/}
          {/*  link={t('modal.trade_success_s2')}*/}
          {/*  opened={opened}*/}
          {/*  type={'failed'}*/}
          {/*/>*/}
          {/*<EarnFunModal onClose={close} opened={opened} />*/}
        </GridContainer>
        {/*<Footer />*/}
      </AppShell>
    </DAppProvider>
  );
}

export default observer(AirdropPage);
