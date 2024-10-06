import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BoxProps,
  createStyles,
  ScrollArea,
  ScrollAreaProps,
  Tabs,
  TabsListProps,
} from '@asuikit/core';

interface ScrollTabListProps extends ScrollAreaProps {
  tabListProps?: TabsListProps;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const ScrollTabList: React.FC<React.PropsWithChildren<ScrollTabListProps>> = ({
  children,
  tabListProps,
  ...restProps
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  return (
    <ScrollArea type="never" {...restProps}>
      <Tabs.List {...tabListProps} sx={{ flexWrap: 'nowrap' }}>
        {children}
      </Tabs.List>
    </ScrollArea>
  );
};

export default memo(ScrollTabList);
