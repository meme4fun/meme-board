import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  BoxProps,
  MantineSize,
  createStyles,
  Text,
  Button,
} from '@asuikit/core';
import IconNoData from '@/icons/IconNoData';

interface NoDataProps extends BoxProps {
  _?: any;
  iconStyle?: CSSProperties | undefined;
  size?: MantineSize;
  content?: string;
  img?: string;
  btnText?: string;
  onClick?: () => void;
}

const useStyles = createStyles((theme) => {
  const colors = theme.colors;
  return {
    Root: {
      padding: 20,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
    },
    Icon: {
      width: '40%',
      maxWidth: 182,
      margin: '1em',
    },
    Text: {
      color: colors.text[1],
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '20px',
    },
  };
});

const ICON_SIZE: Record<MantineSize, string> = {
  xs: '5rem',
  sm: '6rem',
  md: '8rem',
  lg: '9rem',
  xl: '10rem',
};

const NoSearchData: React.FC<NoDataProps> = ({
  iconStyle,
  className,
  size = 128,
  content,
  img,
  onClick,
  btnText,
  ...boxProps
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  return (
    <Box
      // p={size}
      {...boxProps}
      className={cx(classes.Root, 'no-data', className)}
    >
      <IconNoData
        className={classes.Icon}
        style={{
          width: ICON_SIZE[size] || size,
          height: ICON_SIZE[size] || size,
          ...iconStyle,
        }}
        img={'/images/no-search-data.svg'}
      />
      <Text className={classes.Text}>
        {content || t('main.no_search_result')}
      </Text>

      {onClick && btnText && (
        <Button size="sm" color="white.1" mt={20} onClick={onClick}>
          {btnText}
        </Button>
      )}
    </Box>
  );
};

export default memo(NoSearchData);
