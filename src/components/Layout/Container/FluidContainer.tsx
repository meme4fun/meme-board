/**
 * Created by xwxtwd on 2022/5/15
 */
import React from 'react';
import { createStyles } from '@asuikit/core';

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {
    wrap: {
      width: '100%',
      padding: '0 5vw',
      margin: 'auto',
      maxWidth: '100%',
      overflow: 'hidden',
    },
  };
});

const FixedContainer: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const { classes } = useStyles();
  const { children } = props;
  return <div className={classes.wrap}>{children}</div>;
};
export default FixedContainer;
