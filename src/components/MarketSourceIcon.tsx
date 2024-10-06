import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, createStyles } from '@asuikit/core';
import { PolymorphicComponentProps } from '@asuikit/utils';
import { AvatarProps } from '@asuikit/core';
import QuestionIcon from '@/icons/QuestionIcon';
import {
  IconSourceAlienswap,
  IconSourceBlur,
  IconSourceElement,
  IconSourceOpensea,
} from '@/icons/as';

interface MarketSourceIconProps
  extends Omit<PolymorphicComponentProps<'div', AvatarProps>, 'onChange'> {
  source?: string;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const MarketSourceIcon: React.FC<MarketSourceIconProps> = ({
  source,
  children,
  ...props
}) => {
  console.log('💬️ ~ file: MarketSourceIcon.tsx:24 ~ source:', source);
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  if (source === 'alienswap.xyz') {
    return (
      <IconSourceAlienswap
        className=" bg-opacity-50 bg-black rounded-full"
        size={props.size}
      />
    );
  }

  if (source === 'element.market') {
    return (
      <IconSourceElement
        className=" bg-opacity-50 bg-black rounded-full"
        size={props.size}
      />
    );
  }
  if (source === 'opensea.io') {
    return (
      <IconSourceOpensea
        className=" bg-opacity-50 bg-black rounded-full"
        size={props.size}
      />
    );
  }
  if (source === 'blur.io') {
    return (
      <IconSourceBlur
        className=" bg-opacity-50 bg-black rounded-full"
        size={props.size}
      />
    );
  }

  return (
    <Avatar {...props}>
      {children ? children : <QuestionIcon color="#fff" />}
    </Avatar>
  );
};

export default memo(MarketSourceIcon);
