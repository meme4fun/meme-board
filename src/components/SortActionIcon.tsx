import React, {
  DOMAttributes,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  ActionIconProps,
  Stack,
  createStyles,
} from '@asuikit/core';
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';

type StateType = 'desc' | 'asc' | '';
interface SortActionIconProps
  extends ActionIconProps,
    DOMAttributes<HTMLButtonElement> {
  inactiveColor?: string;
  activeColor?: string;
  state?: StateType;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const SortActionIcon: React.FC<SortActionIconProps> = ({
  state = '',
  inactiveColor = '#303030',
  activeColor = '#7B61FF',
  ...actionIconProps
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  return (
    <ActionIcon {...actionIconProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 12 12"
      >
        <path
          d="M6 2L3 5H9L6 2Z"
          fill={state === 'asc' ? activeColor : inactiveColor}
        />
        <path
          d="M6 10L3 7H9L6 10Z"
          fill={state === 'desc' ? activeColor : inactiveColor}
        />
      </svg>
    </ActionIcon>
  );
};

export default memo(SortActionIcon);
