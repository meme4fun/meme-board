import React, { HTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@asuikit/core';

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
  withoutPx?: boolean;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const GridContainer: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  children,
  withoutPx,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  return (
    <div
      {...props}
      className={cx(
        'GridContainer',
        classes.root,
        'grid grid-cols-12 gap-2 md:gap-4 lg:gap-6  col-span-12 max-w-[1440px] mx-auto',
        {
          'px-4 md:px-8 lg:px-[60px]': !withoutPx,
        },
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default memo(GridContainer);
