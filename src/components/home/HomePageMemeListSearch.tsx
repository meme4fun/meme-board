import { Button, clsx, Input, UnstyledButton } from '@asuikit/core';
import { useInputState } from '@asuikit/hooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseLine, RiSearch2Line } from 'react-icons/ri';

interface HomePageMemeListSearchProps {
  _?: any;
}

const HomePageMemeListSearch: React.FC<HomePageMemeListSearchProps> = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useInputState('');

  return (
    <div className="flex items-center">
      <Input
        variant="unstyled"
        type="text"
        className="box-border h-12 w-[440px] border-[3px] border-black px-3"
        placeholder={t('searchNameTicker', 'Search Name/Ticker/0x...')}
        rightSection={
          !search ? (
            <RiSearch2Line className="text-black/40" />
          ) : (
            <RiCloseLine
              className="cursor-pointer text-black/40"
              onClick={() => setSearch('')}
            />
          )
        }
        classNames={{
          input: 'h-full',
          wrapper: 'bg-[#fff]',
        }}
        onChange={setSearch}
        value={search}
      />
      <UnstyledButton
        variant=""
        className={clsx(
          'center ml-2 box-border h-12 border-[3px] border-solid border-black  px-3 text-lg font-semibold',
          {
            'bg-[#BAFF26]': search,
            'bg-[#fff]': !search,
          },
        )}
      >
        {t('search', 'Search')}
      </UnstyledButton>
    </div>
  );
};

export default memo(HomePageMemeListSearch);
