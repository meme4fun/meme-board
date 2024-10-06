import React from 'react';
import NavBar from '@/components/Layout/Navbar';
import DAppProvider from '@/components/DAppProvider';
import SEO from '@/components/SEO';
import { useLargeThan } from '@/hooks/useWidthQuery';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  createStyles,
  Text,
  Image,
  Center,
} from '@asuikit/core';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/Layout/Footer';

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return {
    root: {},
  };
});

function LoadMore({ onClick = () => {} }) {
  const { classes, cx } = useStyles();
  const { t, i18n } = useTranslation();
  const smScreen = useLargeThan('sm');
  const mdScreen = useLargeThan('md');
  const router = useRouter();

  return (
    <div className={classes.root}>
      <Center my={32}>
        <Box
          py={10}
          px={16}
          bg={'#FFFFFF33'}
          sx={{ borderRadius: 8, cursor: 'pointer' }}
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          <Text fz={16} lh={'20px'}>
            {t('market.social_nft.load_more')}
          </Text>
        </Box>
      </Center>
    </div>
  );
}

export default observer(LoadMore);
