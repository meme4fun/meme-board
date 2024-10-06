import { CSSObject, MantineTheme } from '@asuikit/core';
import { _globalStylesEvals } from './globalClass';

import {
  buildGlobalClassnamesAndCssObject,
  parseCssObjectEvals,
} from './tools';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export default function globalStyle(theme: MantineTheme): CSSObject {
  const colorsVars = {};
  Object.keys(theme.colors).forEach((key) => {
    const colors = theme.colors[key];
    colors.forEach((color, index) => {
      const rgb = hexToRgb(color);
      colorsVars[`--color-${key}-${index}`] = rgb
        ? ` ${rgb.r} ${rgb.g} ${rgb.b}`
        : color;
    });
  });

  const { colors } = theme;

  return {
    ':root': {
      ...colorsVars,
    },
    ...theme.other.preset?.scrollbar?.(),
    html: {
      minHeight: '100%',
    },
    body: {
      // minHeight: '100%',
      color: theme.colors.text?.[1],
      background: theme.colors.bg?.[1],
      fontWeight: 500,
      fontSize: '14px',
      // whiteSpace: 'pre-line',
    },
    '.ellipsis': {
      overflow: 'hidden',
      textOverflow: 'ellipsis', //文本溢出显示省略号
      whiteSpace: 'nowrap', //文本不会换行
    },
    'a,a:link,a:visited,a:hover,a:active': {
      textDecoration: 'none',
      color: 'inherit',
    },
    ...parseCssObjectEvals(_globalStylesEvals, theme),
    '.animate-spin': {
      animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
      to: {
        transform: 'rotate(1turn)',
      },
    },
  };
}
