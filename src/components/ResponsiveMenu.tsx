import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  createStyles,
  Drawer,
  DrawerProps,
  Menu,
  MenuProps,
  Modal,
  ModalProps,
  ScrollArea,
  useMantineTheme,
} from '@asuikit/core';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from '@asuikit/hooks';
import AlienStyles from '@/styles/alien-styles';
import { useBoolean } from 'ahooks';
import { noop } from 'lodash';

// interface ResponsiveMenuProps extends ModalProps, DrawerProps {
//   _?: any;
// }

type ResponsiveMenuProps = MenuProps & {
  drawer?: Partial<DrawerProps>;
  title?: string;
};

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {
    Drawer: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '90vh',
    },
  };
});

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = (props) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [drawerShow, { toggle: toggleDrawerShow, setFalse: closeDrawer }] =
    useBoolean(false);
  const isMobile = useMediaQuery(
    `(max-width: ${theme.breakpoints.md}px)`,
    false,
    { getInitialValueInEffect: false },
  );

  const [target, list] = useMemo(() => {
    let targetChildren: any = null;
    let listChildren: any = null;
    React.Children.forEach(props.children, (child: any) => {
      if ((child as any).type === Menu.Target) {
        targetChildren = React.cloneElement(child.props.children, {
          onClick: toggleDrawerShow,
        });
      }
      if ((child as any).type === Menu.Dropdown) {
        listChildren =
          React.Children.count(child.props.children) === 1
            ? React.cloneElement(child.props.children)
            : React.Children.map(child.props.children, (child) =>
                React.cloneElement(child),
              );
      }
    });

    return [targetChildren, listChildren];
  }, [props.children, toggleDrawerShow]);

  if (isMobile) {
    return (
      <Menu>
        {target}
        <Drawer
          className={cx(classes.Drawer)}
          opened={drawerShow}
          onClose={closeDrawer}
          position={'bottom'}
          size="sm"
          padding="md"
          title={props.title}
          {...props.drawer}
        >
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <ScrollArea.Autosize
              style={{ width: '100%', overflow: 'hidden' }}
              mah={'100%'}
            >
              {list}
              <Box sx={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
            </ScrollArea.Autosize>
          </Box>
        </Drawer>
      </Menu>
    );
  }

  return <Menu {...props} />;
};

export default observer(ResponsiveMenu);
