/**
 * Created by xwxtwd on 2022/5/15
 */
import React from 'react';
import { createStyles } from '@asuikit/core';

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {
    wrap: {
      width: '1440px',
      padding: '0 5vw',
      margin: '0 auto',
      maxWidth: '100%',
      // overflow: 'hidden',
      boxSizing: 'border-box',
    },
  };
});

const FixedContainer: React.FC<
  React.PropsWithChildren<{ width?: string; padding?: string }>
> = (props) => {
  const { classes } = useStyles();
  const { children, width, padding } = props;
  return (
    <div className={classes.wrap} style={{ width, padding }}>
      {children}
    </div>
  );
};
export default FixedContainer;
