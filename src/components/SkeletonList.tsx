import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@asuikit/core';

interface SkeletonListProps {
  size: number;
  node: React.ComponentType;
}

const useStyles = createStyles((theme) => {
  const colors = theme.other.colors;
  return {};
});

const SkeletonList: React.FC<SkeletonListProps> = ({
  size = 0,
  node: Node,
}) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  console.log('💬️ ~ file: SkeletonList.tsx:30 ~ size:', size);
  if (!size) return null;

  return (
    <>
      {new Array(Math.max(size, 0)).fill(null).map((_, index) => (
        // @ts-ignore
        <Node key={index} />
      ))}
    </>
  );
};

export default memo(SkeletonList);
