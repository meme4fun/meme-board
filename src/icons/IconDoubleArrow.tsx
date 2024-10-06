import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#888888' }) => {
  return (
    <SVG id="IconDoubleArrowTwotone">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3473_852)">
          <path
            d="M5 9.20996L5 12.43L10 16L15 12.43L15 9.20996L10 12.79L5 9.20996Z"
            fill="white"
          />
          <path
            d="M5 4.20996L5 7.42996L10 11L15 7.42996L15 4.20996L10 7.78996L5 4.20996Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_3473_852">
            <rect
              width="20"
              height="20"
              fill={color}
              transform="translate(20) rotate(90)"
            />
          </clipPath>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
