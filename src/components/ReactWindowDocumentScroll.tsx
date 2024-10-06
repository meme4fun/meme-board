import React, { HTMLAttributes, memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@asuikit/core';
import { useScroll } from 'ahooks';

interface ReactWindowDocumentScrollProps
  extends HTMLAttributes<HTMLDivElement> {
  onScroll?: any;
}

const ReactWindowDocumentScroll = React.forwardRef<
  any,
  React.PropsWithChildren<ReactWindowDocumentScrollProps>
>(({ onScroll, children, style, ...other }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll(
    () => window as any,
    () => {
      if (!(onScroll instanceof Function)) {
        return false;
      }
      const {
        clientWidth,
        clientHeight,
        scrollLeft,
        scrollTop,
        scrollHeight,
        scrollWidth,
      } = document.documentElement;
      onScroll({
        currentTarget: {
          clientHeight,
          clientWidth,
          scrollLeft,
          scrollTop:
            scrollTop -
            (containerRef.current
              ? containerRef.current.getBoundingClientRect().top + scrollTop
              : 0),
          scrollHeight,
          scrollWidth,
        },
      });
      return false;
    },
  );

  useEffect(() => {
    (ref as any).current = document.documentElement;
  }, []);

  return (
    <div
      style={{ position: 'relative', width: style?.width }}
      ref={containerRef}
      {...other}
    >
      {children}
    </div>
  );
});
ReactWindowDocumentScroll.displayName = 'ReactWindowDocumentScroll';

export default ReactWindowDocumentScroll;
