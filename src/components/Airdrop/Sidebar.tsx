import React, { memo } from 'react';
import {
  ActionIcon,
  Button,
  CopyButton,
  SegmentedControl,
  Text,
  Tooltip,
} from '@asuikit/core';
import { truncateAddress } from '@/utils';
import { RiShareBoxLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  options: any[];
  onValueChange: (value: React.SetStateAction<string>) => void;
  selectValue: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  options,
  onValueChange,
  selectValue,
}) => {
  const { t } = useTranslation();
  return (
    <div className="yellow-card col-span-3 h-full w-[280px] rounded-[24px] px-6 py-10">
      <div className="flex flex-col items-center gap-1">
        <img
          className="size-[78px] rounded-full"
          style={{
            border: '2px solid #000000',
          }}
          src="https://pump.mypinata.cloud/ipfs/QmVLX1USrX3DuAYhh9dpo1ry8JC5dTKEVgsMoJrU2cAmPe?img-width=128&img-dpr=2&img-onerror=redirect"
          alt="it's me"
        />
        <Text mt={8} fw={600} size={16}>
          @Poppy
        </Text>
        <div className="flex items-center">
          <Text className="mr-2">
            {truncateAddress('7L8xGqidhAay1Pe3LD87aEQbNdmr9jevyHLdVxxyFoek')}
          </Text>
          <CopyButton value="7L8xGqidhAay1Pe3LD87aEQbNdmr9jevyHLdVxxyFoek">
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
                <Button
                  variant="outline"
                  onClick={copy}
                  size="18px"
                  className="rounded-[56px] border border-black bg-transparent px-[6px] py-px text-[14px] font-normal leading-[16px] text-black"
                >
                  Copy
                </Button>
              </Tooltip>
            )}
          </CopyButton>
          <ActionIcon size={18} className="hover:bg-transparent ml-1">
            {<RiShareBoxLine size={18} />}
          </ActionIcon>
        </div>
      </div>
      <SegmentedControl
        value={selectValue}
        mt={40}
        orientation={'vertical'}
        data={options}
        transitionDuration={0}
        radius="8"
        onChange={onValueChange}
        styles={(theme) => ({
          root: {
            backgroundColor: 'transparent',
            display: 'flex',
            gap: 16,
            padding: 0,
            width: '100%',
          },
          label: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000',
            fontWeight: 500,
            fontSize: 18,
            height: 46,
            padding: 0,
            fonWeight: 600,
          },
          indicator: {
            display: 'none',
          },
          controlActive: {
            backgroundColor: '#BAFF26',
            borderRadius: 8,
            border: '2px solid #000000 !important',
          },
          control: {
            backgroundColor: '#E7C917',
            borderRadius: 8,
            border: '2px solid transparent !important',
          },
        })}
      />
    </div>
  );
};

export default memo(Sidebar);
