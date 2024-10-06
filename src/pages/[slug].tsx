import React from 'react';
import DAppProvider from '@/components/DAppProvider';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { AppShell } from '@asuikit/core';
import { STATIC_BASEURL } from '@/constants';
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import { PublicKey } from '@solana/web3.js';
import GridContainer from '@/components/Layout/Container/GridContainer';
import HomePageMarquee from '@/components/home/HomePageMarquee';
import DetailPageTabs from '@/components/detail/DetailPageTabs';
import TokenInfoCard from '@/components/detail/TokenInfoCard';
import DetailPageTrade from '@/components/detail/DetailPageTrade';
import DetailPageComments from '@/components/detail/DetailPageComments';
import DetailPageHolder from '@/components/detail/DetailPageHolder';
import TradeControllerPanel from '@/components/detail/TradeControllerPanel';

function TokenDetailPage() {
  const { t } = useTranslation();

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
        <GridContainer className="relative z-10">
          <div className="discover-detail-page-layout col-span-12 mt-5">
            <DetailPageTabs />
            <div className="mt-4 grid grid-cols-12 border-2 border-black bg-[#fff]">
              <div className="col-span-3 border-r-2 border-black">
                <TokenInfoCard />
              </div>
              <div className="col-span-9">
                {/* <DetailPageTrade /> */}
                <DetailPageComments />
                {/*<DetailPageHolder />*/}
              </div>
            </div>
            <TradeControllerPanel />
          </div>
        </GridContainer>
        <Footer />
      </AppShell>
    </DAppProvider>
  );
}

export const getServerSideProps = async (ctx) => {
  const slug = ctx.params.slug;
  return {
    props: {},
  };
  // try {
  //   if (!PublicKey.isOnCurve(slug)) {
  //     return {
  //       props: {},
  //     };
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     notFound: true,
  //   };
  // }
  // return {
  //   notFound: true,
  //   props: {},
  // };
};

export default observer(TokenDetailPage);
