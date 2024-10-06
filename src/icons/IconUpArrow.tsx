import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#ffffff' }) => {
  return (
    <SVG id="up">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.66675 10L7.66675 6L11.6667 10"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVG>
  );
};

export default memo(Icon);
