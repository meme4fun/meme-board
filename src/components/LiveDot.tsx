import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, keyframes } from '@asuikit/core';

interface LiveDotProps {
  state?: 'active' | '' | 'hold' | 'disabled';
  size?: number;
  className?: string;
}

const liveDotKeyframes = keyframes({
  '0%': {
    opacity: 0.3,
    transform: 'scale(1)',
  },
  '60%': {
    opacity: 0.3,
  },
  '100%': {
    transform: 'scale(4)',
    opacity: 0,
  },
});

const useStyles = createStyles((theme, props: { size: number }) => {
  const colors = theme.other.colors;
  const { size } = props;
  return {
    dot: {
      paddingLeft: 8,
      '.live-dot,.live-dot:before': {
        width: size,
        height: size,
        display: 'block',
        borderRadius: '100%',
        background: theme.colors['decline']?.[8] || theme.colors.red?.[9],
        position: 'relative',
        transition: 'background-color .4s ease',
      },
      '.live-dot.active': {
        background: theme.colors['raise']?.[8] || theme.colors.green?.[9],
      },
      '.live-dot.hold': {
        background: theme.colors.orange[4] || theme.colors.orange?.[9],
      },
      '.live-dot.disabled': {
        background: theme.colors.text[3],
      },
      '.live-dot.active:not(.hold):before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        animation: `${liveDotKeyframes} 2s ease-in infinite`,
        background: theme.colors['raise']?.[8] || theme.colors.green?.[9],
      },
    },
  };
});

const LiveDot: React.FC<LiveDotProps> = ({
  state = 'active',
  size = 4,
  className = '',
}) => {
  const { classes, cx } = useStyles({ size });
  const { t } = useTranslation();
  return (
    <div className={cx('live-dot-box', className, classes.dot)}>
      <span className={cx('live-dot', state)}></span>
    </div>
  );
};

export default memo(LiveDot);
