import SVG from '@/components/SVG';
import React, { CSSProperties, memo } from 'react';

interface IProps {
  color?: string;
  className?: string;
  img?: string;

  style?: CSSProperties | undefined;
}

const IconNoData: React.FC<IProps> = ({
  color = '#ffffff',
  className,
  img,
  style,
}) => {
  return (
    <img
      src={img || '/images/no-data.svg'}
      alt=""
      className={className}
      style={style}
    />
  );
};

export default memo(IconNoData);
