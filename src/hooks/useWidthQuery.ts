import { MantineSize, useMantineTheme } from '@asuikit/core';
import { useMediaQuery } from '@asuikit/hooks';
import { UseMediaQueryOptions } from '@asuikit/hooks/lib/use-media-query/use-media-query';

type P = Parameters<typeof useMediaQuery>;

export function useLargeThan(
  size: MantineSize | string,
  initialValue?: P[1],
  options?: UseMediaQueryOptions,
) {
  const theme = useMantineTheme();
  return useMediaQuery(
    `(min-width: ${theme.breakpoints[size] || size})`,
    initialValue,
    options,
  );
}

export function useSmallThan(
  size: MantineSize | string,
  initialValue?: P[1],
  options?: UseMediaQueryOptions,
) {
  const theme = useMantineTheme();
  return useMediaQuery(
    `(max-width: ${theme.breakpoints[size] || size})`,
    initialValue,
    options,
  );
}
