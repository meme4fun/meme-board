import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useSolanaAccount,
  useSolanaConnection,
  useSolanaWallet,
} from '@/providers/solana-wallet-provider/hooks';
import { useWallet } from '@solana/wallet-adapter-react';
import { truncateAddress } from '@/utils';
import { useStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import { priceFormat } from '@alien-mm/utils/dist/formatter';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Popover } from '@asuikit/core';
import { RiCloseLine, RiShutDownLine } from 'react-icons/ri';
import AsCopyButton from '../AsCopyButton';
import { ASIconCopy } from '@/icons/as';
import { useBoolean, useDebounce } from 'ahooks';

interface HeaderProps {
  _?: unknown;
}

const menuList = [
  { label: 'Discover', link: '/' },
  { label: 'Create', link: '/create' },
  { label: 'Airdrop', link: '/airdrop', query: 'airdrop' },
];

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const store = useStore();
  const { t } = useTranslation();

  const { connection } = useSolanaConnection();
  const { account, connect: handleConnect } = useSolanaAccount();

  const {
    wallet,
    publicKey,
    connect,
    disconnect,
    signMessage: signMsg,
    signTransaction: signTx,
    signAllTransactions: signAllTx,
    sendTransaction: sendTx,
  } = useSolanaWallet();

  useEffect(() => {
    async function fetch() {
      if (!publicKey) return;
      const res = await connection.getBalance(publicKey);
      store.sol.balance.setValue(String(res));
    }
    fetch();
    publicKey && store.sol.publicKeyState.setValue(publicKey);
  }, [connection, publicKey, store.sol.balance, store.sol.publicKeyState]);

  const [overviewOpened, setOverViewOpened] = useBoolean();

  return (
    <div className="w-full bg-[#A2CFF9] px-[60px]">
      <div className="mx-auto grid h-[72px] max-w-screen-xl grid-cols-3 items-center">
        <img
          className="h-[48px] w-[131px]"
          src={`/images/meme/meme4fun-logo.png`}
          alt="logo"
        />
        <div className="justify-self-center">
          <div className="flex h-14 items-center justify-between gap-[20px]">
            {menuList.map((menuItem: any) => (
              <Link href={`${menuItem.link}`} key={menuItem.link}>
                <div
                  className={`h-[36px] w-[120px] cursor-pointer rounded-[100px] text-center text-[20px] font-semibold leading-8 ${router.pathname === menuItem.link ? 'green-sm-card' : ''}`}
                >
                  {menuItem.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-self-end">
          <div className="flex h-14 items-center justify-between gap-[20px]">
            <div className="white-sm-card flex h-[36px] items-center gap-1 rounded-[100px] px-3 text-center text-[14px] font-semibold leading-8">
              <img
                src={`/images/meme/sol-logo.png`}
                width={16}
                height={16}
                alt="sol logo"
              />
              SOL
              {publicKey && (
                <div className="text-[#3C38F5]">
                  <Observer>
                    {() => <>{priceFormat(store.sol.balance.formatter)}</>}
                  </Observer>
                </div>
              )}
            </div>
            {!publicKey && (
              <div
                onClick={() => handleConnect()}
                className="green-btn flex h-[36px] items-center gap-1 rounded-[100px] px-3 text-center text-[16px] font-semibold leading-8"
              >
                {t('meme4fun.main.connect_wallet')}
              </div>
            )}
            {publicKey && (
              <Popover
                classNames={{
                  dropdown:
                    'bg-[#fff] border-[2px] border-[#000] rounded-[12px] p-0',
                }}
                width={320}
                position="bottom-end"
                shadow="md"
                opened={overviewOpened}
                onClose={setOverViewOpened.setFalse}
              >
                <Popover.Target>
                  <div
                    onClick={setOverViewOpened.setTrue}
                    className="green-btn flex h-[36px] items-center gap-1 rounded-[100px] px-3 text-center text-[16px] font-semibold leading-8"
                  >
                    {truncateAddress(publicKey.toBase58())}
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <div className="flex justify-end px-4 py-2">
                    <ActionIcon
                      onClick={setOverViewOpened.setFalse}
                      size={20}
                      className="border-2 border-black"
                    >
                      <RiCloseLine />
                    </ActionIcon>
                  </div>
                  <div className="bg-[#95A6FF]/20 p-4 pt-2">
                    <div className="flex gap-2.5">
                      <img
                        src="/images/default-avatar.jpeg"
                        alt=""
                        className="block size-10 rounded-full border-2 border-solid border-black"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-[#3C38F5] underline underline-offset-4">
                          {t('view_my_profile')}
                        </div>
                        <div>{truncateAddress(publicKey.toBase58())}</div>
                      </div>
                      <div className="flex items-end gap-1.5">
                        <AsCopyButton value={publicKey.toBase58()}>
                          <ActionIcon className="rounded-md bg-[#000000]/90 text-[#fff] hover:bg-black">
                            <ASIconCopy size={18} />
                          </ActionIcon>
                        </AsCopyButton>

                        <ActionIcon
                          onClick={disconnect}
                          className="rounded-md bg-[#000000]/90 text-[#fff] hover:bg-black"
                        >
                          <RiShutDownLine size={12} />
                        </ActionIcon>
                      </div>
                    </div>
                    <div className="mt-4 flex bg-[#fff] px-4 py-3">
                      <img
                        src={`/images/meme/sol-logo.png`}
                        width={16}
                        height={16}
                        alt="sol logo"
                      />
                      <div className="flex-1">SOL</div>
                      <div className="text-[#000000]/60">
                        <Observer>
                          {() => (
                            <>{priceFormat(store.sol.balance.formatter)}</>
                          )}
                        </Observer>
                      </div>
                    </div>
                  </div>
                </Popover.Dropdown>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
