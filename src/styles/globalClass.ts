import { CSSObject, MantineTheme } from '@asuikit/core';
import { type } from 'os';
import {
  buildGlobalClassnamesAndCssObject,
  parseCssObjectEvals,
} from './tools';

const styles = {
  Button: {
    Brand1: (colors) => ({ background: colors?.Brand1, border: 'none' }),
  },
};

type ChangeVTS<O> = {
  [K in keyof O]: O[K] extends Function
    ? string
    : O[K] extends Object
      ? ChangeVTS<O[K]>
      : string;
};

type globalClassTypes = ChangeVTS<typeof styles>;

const [globalClass, globalStylesEvals] =
  buildGlobalClassnamesAndCssObject(styles);

export default globalClass as globalClassTypes;

export const _globalStylesEvals = globalStylesEvals;
