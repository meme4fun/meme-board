import { MessageEvents, eventBus } from '@/lib/event';
import { useThrottleFn } from 'ahooks';
import { useEffect, useRef } from 'react';

export function useEventBusOn(
  fn: (...args: any[]) => void,
  events: (keyof MessageEvents)[],
) {
  const throttleCall = useThrottleFn((...args: any[]) => {
    fn?.(...(args as any));
  });

  const fnRef = useRef(throttleCall.run);
  fnRef.current = throttleCall.run;

  useEffect(() => {
    const call = (...args: any[]) => {
      fnRef.current?.apply(undefined, args as any);
    };

    events.forEach((event) => {
      eventBus.on(event, call);
    });

    return () => {
      events.forEach((event) => {
        eventBus.off(event, call);
      });
    };
  }, [events]);
}
