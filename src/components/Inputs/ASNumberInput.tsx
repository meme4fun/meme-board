import React, { useRef, useState } from 'react';
import NavBar from '@/components/Layout/Navbar';
import DAppProvider from '@/components/DAppProvider';
import SEO from '@/components/SEO';
import { useLargeThan } from '@/hooks/useWidthQuery';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  createStyles,
  Text,
  Image,
  Group,
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
} from '@asuikit/core';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Footer from '@/components/Layout/Footer';
import { NumberInputProps } from '@asuikit/core/lib/NumberInput/NumberInput';
import { isNil } from 'lodash';

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return {
    root: {},
  };
});

function ASNumberInput(props: NumberInputProps) {
  const { classes, cx } = useStyles();
  const { t, i18n } = useTranslation();
  const smScreen = useLargeThan('sm');
  const mdScreen = useLargeThan('md');
  const router = useRouter();

  const [value, setValue] = useState<number | ''>(0);
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group spacing={0}>
      <ActionIcon
        size={24}
        variant="default"
        onClick={() => handlers.current?.decrement()}
        disabled={
          props.disabled || (!isNil(props?.min) && props?.value === props?.min)
        }
        bg="grey.3"
        sx={{
          borderRadius: '6px 0 0 6px',
        }}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={props?.value}
        onChange={(val) => props?.onChange?.(val)}
        handlersRef={handlers}
        radius={0}
        {...props}
        styles={{
          wrapper: {
            height: 24,
          },
          input: {
            width: 60,
            textAlign: 'center',
            minHeight: 0,
            borderLeft: 0,
            borderRight: 0,
            height: 24,
          },
        }}
      />

      <ActionIcon
        size={24}
        variant="default"
        onClick={() => handlers.current?.increment()}
        bg="grey.3"
        disabled={
          props.disabled || (!isNil(props?.max) && props?.value === props?.max)
        }
        sx={{
          borderRadius: ' 0 6px  6px 0',
        }}
      >
        +
      </ActionIcon>
    </Group>
  );
}

export default ASNumberInput;
