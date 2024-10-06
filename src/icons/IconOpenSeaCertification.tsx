import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, Box, BoxProps } from '@asuikit/core';
import { STATIC_BASEURL } from '@/constants';
import { PolymorphicComponentProps } from '@asuikit/utils';

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const IconOpenSeaCertification: React.FC<
  PolymorphicComponentProps<'img', BoxProps>
> = (props) => {
  return (
    <Box
      component="img"
      sx={{ width: 14, height: 14 }}
      {...props}
      src={`${STATIC_BASEURL}/images/pass/renzhen.svg`}
    />
  );
};

export default memo(IconOpenSeaCertification);
