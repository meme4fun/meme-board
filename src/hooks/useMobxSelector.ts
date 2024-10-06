import { useMemoizedFn } from 'ahooks';
import { autorun } from 'mobx';
import { useEffect, useState } from 'react';

export function useMobxSelector<T>(selector: () => T): T {
  const [state, setState] = useState(selector());
  const selectorMemo = useMemoizedFn(selector);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      autorun(() => {
        const value = selectorMemo();
        setState(value);
      }),
    [],
  );
  return state;
}
