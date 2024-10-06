import React, { memo, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CloseButton,
  Menu,
  MenuProps,
  Overlay,
  Portal,
  createStyles,
} from '@asuikit/core';
import { useLargeThan } from '@/hooks/useWidthQuery';
import {
  ForwardRefWithStaticComponents,
  PolymorphicComponentProps,
} from '@asuikit/utils';
import { useBoolean } from 'ahooks';

// interface AsMenuProps extends PolymorphicComponentProps<'div', MenuProps> {
//   // menuProps?: MenuProps;
// }

const AsMenuContext = React.createContext<{
  close: () => void;
}>({
  close: () => {},
});

const AsMenuDropdown: React.FC<
  React.PropsWithChildren<{
    title?: string;
    withClose?: boolean;
  }>
> = ({ title, withClose = true, children }) => {
  // const ctx = useContext(AsMenuContext);
  // ctx.target;
  const isLargeMD = useLargeThan('md', true);
  const { close } = useContext(AsMenuContext);

  return (
    <Menu.Dropdown>
      {!isLargeMD && (title || withClose) && (
        <div className="flex py-5 px-4 items-center border-b border-line-2 -mx-[10px]">
          {title && <div className="text-lg font-semibold flex-1">{title}</div>}
          {withClose && (
            <CloseButton
              className="border-line-3"
              onClick={close}
              variant="outline"
            />
          )}
        </div>
      )}
      {children}
    </Menu.Dropdown>
  );
};

type AsMenuComponent = ForwardRefWithStaticComponents<
  MenuProps,
  {
    Dropdown: typeof AsMenuDropdown;
  }
>;

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return { root: {} };
});

const AsMenu: AsMenuComponent = ({ children, ...otherProps }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();

  const isLargeMD = useLargeThan('md', true);

  const [menuVisible, menuVisibleHandler] = useBoolean();

  const menuRef = useRef(null);
  const [opened, setOpened] = useState(false);

  if (isLargeMD) {
    return <Menu {...otherProps}>{children}</Menu>;
  }
  return (
    <AsMenuContext.Provider
      value={{
        close: () => {
          setOpened(false), menuVisibleHandler.set(false);
        },
      }}
    >
      <Menu
        {...otherProps}
        opened={opened}
        withinPortal
        transitionProps={{
          duration: 250,
          transition: 'slide-up',
        }}
        styles={(theme) => {
          return {
            dropdown: {
              position: 'fixed',
              bottom: '0px !important',
              left: '0px !important',
              right: '0px !important',
              top: 'auto !important',
              width: 'auto !important',
              padding: '0 10px !important',
              border: 'none !important',
              background: theme.colors.bg[3],
            },
          };
        }}
        trigger="click"
        onChange={(opened) => {
          otherProps?.onChange?.(opened);
          menuVisibleHandler.set(opened);
        }}
        onOpen={() => {
          otherProps?.onOpen?.();
          setOpened(true);
        }}
        onClose={() => {
          otherProps?.onClose?.();
          setOpened(false);
        }}
      >
        {menuVisible && (
          <Portal>
            <Overlay color="#000" blur={1} />
          </Portal>
        )}
        {children}
      </Menu>
    </AsMenuContext.Provider>
  );
};

AsMenu.displayName = 'AsMenuComponent';

AsMenu.Dropdown = AsMenuDropdown;

export default AsMenu;
