import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tabs,
  TabsPanelProps,
  TabsProps,
  createStyles,
  useComponentDefaultProps,
} from '@asuikit/core';
import { ForwardRefWithStaticComponents } from '@asuikit/utils';
import { TabsPanel } from '@asuikit/core/lib/Tabs/TabsPanel/TabsPanel';
import { isString } from 'lodash';

interface AsLazyTabsProps extends TabsProps {
  _?: any;
}

const AsLazyTabsContext = React.createContext<{
  init?: Record<string, boolean>;
}>({});

const AsLazyTabsPanel = React.forwardRef<any, TabsPanelProps>(
  ({ children, ...props }, ref) => {
    const { init } = useContext(AsLazyTabsContext);

    const render = () => {
      if (init?.[props.value]) {
        return children;
      }
      return null;
    };

    return (
      <Tabs.Panel {...props} ref={ref}>
        {render()}
      </Tabs.Panel>
    );
  },
);
AsLazyTabsPanel.displayName = 'AsLazyTabsPanel';

type TabsComponent = ForwardRefWithStaticComponents<
  TabsProps,
  {
    Panel: typeof AsLazyTabsPanel;
  }
>;

const AsLazyTabs: TabsComponent = ({ children, onTabChange, ...props }) => {
  const [init, setInit] = useState<Record<string, boolean>>(() => {
    if (props.defaultValue) {
      return {
        [props.defaultValue]: true,
      };
    }
    return {};
  });

  useEffect(() => {
    setInit((prev) => {
      if (isString(props.value)) {
        return {
          [props.value]: true,
          ...prev,
        };
      }
      return prev;
    });
  }, [props.value]);

  // const { keepMounted, value } = useTabsContext();
  // console.log('💬️ ~ file: AsLazyTabs.tsx:13 ~ c:', c);

  /* const render = () => {
    if (keepMounted && initedRef.current) {
      console.log('return children');
      return children;
    }
    if (keepMounted && !initedRef.current && props.value === value) {
      console.log('return children 2');
      initedRef.current = true;
      return children;
    }
    return children;
  }; */

  return (
    <AsLazyTabsContext.Provider value={{ init }}>
      <Tabs
        {...props}
        onTabChange={(e) => {
          if (e) {
            // initRef.current[e] = true;
            setInit({
              [e]: true,
              ...init,
            });
          }
          onTabChange?.(e);
        }}
      >
        {children}
      </Tabs>
    </AsLazyTabsContext.Provider>
  );
};

AsLazyTabs.displayName = 'AsLazyTabs';

AsLazyTabs.Panel = AsLazyTabsPanel;

export default AsLazyTabs;
