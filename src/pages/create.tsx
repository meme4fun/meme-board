import React from 'react';
import DAppProvider from '@/components/DAppProvider';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { AppShell, ScrollArea, Stack, Text } from '@asuikit/core';
import { STATIC_BASEURL } from '@/constants';
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import PrimaryButton from '@/components/page/PrimaryButton';
import CreateTokenForm from '@/components/page/CreateTokenForm';
import GridContainer from '@/components/Layout/Container/GridContainer';

function CreatePage() {
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
            backgroundSize: 'contain',
          },
        })}
      >
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="page-container">
          <div className="purple-card min-h-[736px] w-[702px] overflow-hidden rounded-[36px]">
            <ScrollArea h={736} scrollbarSize={0}>
              <CreateTokenForm />
            </ScrollArea>
          </div>
        </div>
        <Footer />
      </AppShell>
    </DAppProvider>
  );
}

export default observer(CreatePage);
