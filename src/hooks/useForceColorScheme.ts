import { useStore } from '@/store';
import { useEffect } from 'react';

export function useForceColorScheme(scheme: 'light' | 'dark') {
  const { setting } = useStore();
  useEffect(() => {
    const previous = setting.isDark ? 'dark' : 'light';

    setting.theme.value = scheme;

    return () => {
      setting.theme.value = previous;
      // setting.theme.save(previous);
    };
  }, [scheme, setting.isDark, setting.theme]);
}
