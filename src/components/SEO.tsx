import { IS_TESTNET } from '@/constants';
import { defaults, isNil, omitBy } from 'lodash';
import Head from 'next/head';
import React, { memo } from 'react';

const DEFAULT_SEO = {
  title: IS_TESTNET ? 'Bridge to ALIENX Chain Hal' : 'Bridge to ALIENX Chain',
  titles: [] as string[],
  description:
    'ALIENX bridge helps you bridge your asset between ALIENX and Ethereum. ALIENX is the only staking blockchain driven by AI Node, built for NFT and Game Mass Adoption.',
  ogTitle: IS_TESTNET ? 'Bridge to ALIENX Chain Hal' : 'Bridge to ALIENX Chain',
  ogImage: 'https://alienxchain.io/images/logo.png',
  ogImageLarge:
    'https://static.alienxchain.io/alienxchain/twitter-share-image.jpeg',
  ogUrl: 'https://hal-bridge.alienxchain.io',
  twCardType: 'summary_large_image' as 'summary_large_image' | 'summary',
};

const SEO: React.FC<Partial<typeof DEFAULT_SEO>> = (props) => {
  const seo = defaults({}, omitBy(props, isNil), DEFAULT_SEO);

  return (
    <Head>
      <title>
        {seo.titles.length ? `${seo.titles.join(' - ')} - ` : ''}
        {seo.title}
      </title>
      <meta name="description" content={seo.description} />
      <meta
        name="keywords"
        content="ALIENX, ALIENXChain, Rollup, AI, Node, BTC, Bitcoin, ETH, NFT, Staking, Layer2, Layer3, Blockchain, Arbitrum, Arbitrum Orbit,  Rewards, Chain, Airdrop, Trading, ARB"
      />
      <meta name="twitter:description" content={seo.description} />
      <meta
        name="twitter:image"
        content={
          seo.twCardType === 'summary_large_image'
            ? seo.ogImageLarge
            : seo.ogImage
        }
      />
      <meta name="twitter:card" content={seo.twCardType} />
      <meta name="twitter:site" content="@" />
      <meta name="twitter:title" content={seo.ogTitle} />

      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:site_name" content={seo.ogTitle} />
      <meta property="og:url" content={seo.ogUrl} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default memo(SEO);
