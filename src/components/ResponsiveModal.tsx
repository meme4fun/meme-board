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
import { useLargeThan, useSmallThan } from '@/hooks/useWidthQuery';
import StyleProvider from './StyleProvider';

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
        const colors = theme.colors;

        return {
          header: {
            background: colors.bg[2],
            [theme.fn.smallerThan('sm')]: {
              padding: 12,
              textAlign: 'left',
              // position: 'relative',
              top: -1,
            },
          },
          title: {
            [theme.fn.smallerThan('sm')]: {
              padding: 0,
              textAlign: 'left',
            },
          },
          content: {
            maxWidth: '100%',
            background: colors.bg[2],
            border: `1px solid ${colors.line[1]}`,
            borderRadius: 6,
            [theme.fn.smallerThan('sm')]: {
              border: 'none',
              boxShadow: 'none',
            },
          },
          body: {
            [theme.fn.smallerThan('sm')]: {
              padding: 12,
            },
          },
          inner: {
            [theme.fn.smallerThan('sm')]: {
              padding: '1vh',
              alignItems: 'flex-end',
            },
          },
        };
      }}
      {...props.modal}
    >
      {props.children}
    </Modal>
  );
};

export default observer(ResponsiveModal);
