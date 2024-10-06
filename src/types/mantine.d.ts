import { MantineTheme } from '@asuikit/core';
import { Tuple, DefaultMantineColor, CSSObject } from '@asuikit/core';

type ExtendedCustomColors =
  | 'line'
  | 'bg'
  | 'text'
  | 'purple'
  | 'white'
  | 'grey'
  | DefaultMantineColor;

declare module '@asuikit/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }

  export interface MantineThemeOther {
    v2: boolean;
    linearGradient: {
      red: Parameters<MantineTheme['fn']['linearGradient']>;
      green: Parameters<MantineTheme['fn']['linearGradient']>;
      blue: Parameters<MantineTheme['fn']['linearGradient']>;
    };
    fn: {
      gradientText(args: { from: string; to: string; deg: number }): CSSObject;
    };
    /* theme v1 */
    colors: any;
    preset: any;
  }
}
