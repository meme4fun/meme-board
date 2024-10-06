import React from 'react';
import DAppProvider from '@/components/DAppProvider';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { getFEOAGlobalConfig } from '@/services/server/feoaServer';
import { AppShell } from '@asuikit/core';
import { STATIC_BASEURL } from '@/constants';
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import HomePageMarquee from '@/components/home/HomePageMarquee';
import HomePageCarousel from '@/components/home/HomePageCarousel';
import GridContainer from '@/components/Layout/Container/GridContainer';
import PrimaryButton from '@/components/page/PrimaryButton';
import HomePageMemeList from '@/components/home/HomePageMemeList';
import Link from 'next/link';

function IndexPage() {
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
        <GridContainer>
          <HomePageCarousel />
          <div className="center col-span-12 mb-[60px] mt-[70px] gap-7">
            <img src="/images/meme/hand.svg" alt="" />
            <Link href={'/create'}>
              <PrimaryButton h={100} shadowOffset={8} activeShadowOffset={2}>
                <img src="/images/meme/Create-Your-Meme.svg" alt="" />
              </PrimaryButton>
            </Link>
            <img className="-scale-x-100" src="/images/meme/hand.svg" alt="" />
          </div>
        </GridContainer>
        <HomePageMemeList />
        <Footer />
      </AppShell>
    </DAppProvider>
  );
}

export const getServerSideProps = async (ctx) => {
  const feoaGlobalConfig = await getFEOAGlobalConfig();

  /* const pairInfos = await TwoLevelsCacheUtil({
    l1Cache: ServerCacheManager.memoryCache,
    l1ttl: 60,
    l2Cache: ServerCacheManager.memoryCache,
    l2ttl: 300,
    cacheKey: 'owlto-pair-infos',
    async fetcher() {
      const response = await fetch(
        'https://owlto.finance/api/bridge_api/v1/get_all_pair_infos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: 'mainnet',
          }),
        },
      );
      const data = await response.json();
      return data.data.pair_infos;
    },
  }).get();
*/
  return {
    props: {},
  };
};

export default observer(IndexPage);
