import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppShell, Box, Button, createStyles } from '@asuikit/core';
import Link from 'next/link';

import DAppProvider from '@/components/DAppProvider';
import { STATIC_BASEURL } from '@/constants';
import SEO from '@/components/SEO';
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';

interface Page404Props {
  _?: any;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const Page404: React.FC<Page404Props> = () => {
  const { classes, cx } = useStyles();
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
        <Header />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 66px - 72px)',
          }}
        >
          <img
            style={{ width: 350 }}
            src={`${STATIC_BASEURL}/images/meme/404.png`}
            alt=""
          />
        </Box>
        <Footer />
      </AppShell>
    </DAppProvider>
    // <DAppProvider>
    //   <Box
    //     sx={({ colors }) => ({
    //       display: 'flex',
    //       flexDirection: 'column',
    //       width: '100vw',
    //       height: '100vh',
    //       minHeight: '500px',
    //       background: colors.bg[2],
    //     })}
    //   >
    //     <Box
    //       sx={{
    //         flex: 1,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <img
    //         style={{ width: 350 }}
    //         src={`${STATIC_BASEURL}/images/meme/404.png`}
    //         alt=""
    //       />
    //       {/*<p>{t('404-error-text')}</p>*/}
    //       <Link href="/">
    //         <Button sx={{ width: 217, height: 48, lineHeight: '48px' }}>
    //           Go Back
    //         </Button>
    //       </Link>
    //     </Box>
    //   </Box>
    // </DAppProvider>
  );
};

export default memo(Page404);
