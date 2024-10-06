import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../page/PrimaryButton';
import { Input } from '@asuikit/core';
import { useStore } from '@/store';
import { PriceInput } from '@alien-mm/uikit';
import { observer } from 'mobx-react-lite';

interface TradeControllerPanelProps {
  _?: any;
}

const TradeControllerPanel: React.FC<TradeControllerPanelProps> = () => {
  const { t } = useTranslation();

  const { buy } = useStore();
  return (
    <div className="mt-12 flex items-center justify-center gap-14">
      <div className="flex flex-col gap-9">
        <PrimaryButton
          activeShadowOffset={0}
          activeBg="#F9D607"
          bg="#95A6FF"
          h={62}
        >
          <img className="w-[120px]" src="/images/buttons/buy.png" alt="" />
        </PrimaryButton>

        <PrimaryButton
          activeShadowOffset={0}
          activeBg="#F9D607"
          bg="#95A6FF"
          h={62}
        >
          <img className="w-[120px]" src="/images/buttons/sell.png" alt="" />
        </PrimaryButton>
      </div>
      <div className="flex flex-col gap-9">
        <PriceInput
          variant="unstyled"
          w={320}
          iconWidth={60}
          placeholder="0"
          icon={
            <div className="flex items-center gap-1 text-sm font-semibold text-black ">
              <img className="block w-4" src="/images/coin/sol.png" alt="" />
              SOL
            </div>
          }
          value={buy.price.value ?? ''}
          onChange={(v) => buy.price.setValue(v.toString())}
          classNames={{
            wrapper: 'border-2 border-black bg-[#fff]',
            input: 'rounded-none h-10 text-right pr-4 font-medium',
          }}
        />
        <PriceInput
          variant="unstyled"
          w={320}
          iconWidth={120}
          placeholder="0"
          icon={
            <div className="flex items-center gap-1 text-sm font-semibold  text-black ">
              {t('meme4fun.discover.trade_max')}
            </div>
          }
          value={buy.slippage.value ?? ''}
          onChange={(v) => buy.slippage.setValue(v.toString())}
          classNames={{
            wrapper: 'border-2 border-black bg-[#fff]',
            input: 'rounded-none h-10 text-right pr-4 font-medium',
          }}
        />
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-2 rounded-full border-[3px] border-black bg-[#95A6FF] p-3 shadow-[inset_3px_3px_0_#000]">
          {[1, 2, 3].map((i) => (
            <PrimaryButton
              key={i}
              borderWidth={2}
              shadowOffset={2}
              activeShadowOffset={2}
              padding="12px"
              bg="#fff"
              styles={{
                root: {
                  width: 64,
                },
              }}
              onClick={() => buy.price.setValue(i.toString())}
            >
              <div>
                <div className="text-xl font-bold leading-none">{i}</div>
                <div className="text-base leading-none">SOL</div>
              </div>
            </PrimaryButton>
          ))}

          <PrimaryButton
            borderWidth={2}
            shadowOffset={2}
            activeShadowOffset={2}
            padding="12px 20px"
            bg="#fff"
            onClick={() => buy.price.setValue('')}
          >
            <div className="text-sm font-bold">
              {t('meme4fun.discover.trade_reset')}
            </div>
          </PrimaryButton>
        </div>

        <div className="flex items-center gap-2 rounded-full border-[3px] border-black bg-[#95A6FF] p-3 shadow-[inset_3px_3px_0_#000]">
          {[1, 2, 3].map((i) => (
            <PrimaryButton
              key={i}
              borderWidth={2}
              shadowOffset={2}
              activeShadowOffset={2}
              padding="12px"
              bg="#fff"
              styles={{
                root: {
                  width: 64,
                },
              }}
              onClick={() => buy.slippage.setValue(i.toString())}
            >
              <div className="text-xl leading-none">
                {i}
                <span className="text-sm">%</span>
              </div>
            </PrimaryButton>
          ))}

          <PrimaryButton
            borderWidth={2}
            shadowOffset={2}
            activeShadowOffset={2}
            padding="12px 20px"
            bg="#fff"
            onClick={() => buy.slippage.setValue('')}
          >
            <div className="text-sm font-bold">
              {t('meme4fun.discover.trade_reset')}
            </div>
          </PrimaryButton>
        </div>
      </div>
      <PrimaryButton
        activeShadowOffset={0}
        activeBg="#F9D607"
        bg="#95A6FF"
        h={118}
      >
        <img className="w-[100px]" src="/images/buttons/pt.png" alt="" />
      </PrimaryButton>
    </div>
  );
};

export default observer(TradeControllerPanel);
