import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  createStyles,
  Drawer,
  DrawerProps,
  Modal,
  ModalProps,
  ScrollArea,
  useMantineTheme,
} from '@asuikit/core';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from '@asuikit/hooks';
import AlienStyles from '@/styles/alien-styles';

// interface ResponsiveModalProps extends ModalProps, DrawerProps {
//   _?: any;
// }

type ResponsiveModalProps = ModalProps &
  DrawerProps & {
    drawer?: Partial<DrawerProps>;
    modal?: Partial<ModalProps>;
  };

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {
    Drawer: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '90vh',
      // overflow: 'auto',
    },
  };
});

const ResponsiveModal: React.FC<ResponsiveModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(
    `(max-width: ${theme.breakpoints.sm}px)`,
    false,
    { getInitialValueInEffect: false },
  );

  if (isMobile) {
    return (
      <Drawer
        styles={{
          header: {
            padding: 16,
            paddingBottom: 0,
          },
          body: {
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
          },
        }}
        className={cx(props.className, classes.Drawer)}
        opened={props.opened}
        onClose={props.onClose}
        position={props.position || 'bottom'}
        size="xl"
        padding={0}
        title={props.title}
        lockScroll
        {...props.drawer}
      >
        <ScrollArea.Autosize
          style={{ width: '100%', overflowX: 'hidden' }}
          mah={'100%'}
          type="scroll"
        >
          {/* <Box sx={{ paddingBottom: '2000px' }} /> */}
          <Box sx={{ padding: '0 16px 16px' }}>{props.children}</Box>
          <Box sx={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
        </ScrollArea.Autosize>
      </Drawer>
    );
  }

  return (
    <Modal
      className={props.className}
      opened={props.opened}
      size={props.size}
      overlayProps={{
        opacity: 0.68,
        blur: 10,
      }}
      centered
      onClose={props.onClose}
      closeOnClickOutside={false}
      title={props.title}
      transitionProps={{ transition: 'slide-down' }}
      styles={(theme) => {
        const colors = theme.other.colors;
        return AlienStyles.Modal.centerHeaderTitle(
          {
            root: {},
            title: {
              textAlign: 'left',
              padding: '0px',
              fontSize: 24,
              fontWeight: 700,
            },
            close: {
              border: `1px solid ${theme.colors.line[3]}`,
              borderRadius: 6,
            },
            header: {
              background: theme.colors.grey[0],
              padding: 24,
              [theme.fn.smallerThan('lg')]: {
                padding: 12,
              },
            },
            body: {
              paddingLeft: 24,
              paddingRight: 24,
              paddingBottom: 24,
              [theme.fn.smallerThan('lg')]: {
                padding: 12,
                paddingTop: 0,
              },
            },
            content: {
              maxWidth: '100%',
              background: theme.colors.grey[0],
              // border: `1px solid #8E54E9`,
              borderRadius: 20,
              [theme.fn.smallerThan('lg')]: {
                borderRadius: 4,
              },
              // boxShadow: 'inset 0px 0px 34px rgba(115, 97, 232, 0.3)',
              input: {
                background: 'transparent', //theme.colors.line[0],
                border: `1px solid ${theme.colors.line[2]}`,
              },
            },
            inner: {
              [theme.fn.smallerThan('lg')]: {
                padding: '1vh',
                alignItems: 'flex-end',
              },
            },
          },
          theme,
        );
      }}
      {...props.modal}
    >
      {props.children}
    </Modal>
  );
};

export default observer(ResponsiveModal);
