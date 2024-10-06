import SVG from '@/components/SVG';
import { Box } from '@asuikit/core';
import React, { memo } from 'react';

interface IProps {
  startColor?: string;
  endColor?: string;
  width?: number;
  height?: number;
}

const Icon: React.FC<IProps> = ({
  startColor = '#4776E6',
  endColor = '#8E54E9',
  width = 12,
  height = 12,
}) => {
  return (
    <SVG id="icon-shopping-cart">
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 12 12"
      >
        <path
          stroke="url(#paint0_linear_1804_10848)"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M.75 1.5h.875L2 3 .75 1.5zM2 3l1.25 5h6.5L11 3H2z"
        ></path>
        <path
          stroke="url(#paint1_linear_1804_10848)"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.25 10.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
        ></path>
        <path
          stroke="url(#paint2_linear_1804_10848)"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 10.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_1804_10848"
            x1="0.75"
            x2="11"
            y1="4.75"
            y2="4.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor}></stop>
            <stop offset="1" stopColor={endColor}></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_1804_10848"
            x1="2.5"
            x2="4"
            y1="9.75"
            y2="9.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor}></stop>
            <stop offset="1" stopColor={endColor}></stop>
          </linearGradient>
          <linearGradient
            id="paint2_linear_1804_10848"
            x1="9"
            x2="10.5"
            y1="9.75"
            y2="9.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor}></stop>
            <stop offset="1" stopColor={endColor}></stop>
          </linearGradient>
        </defs>
      </Box>
    </SVG>
  );
};

export default memo(Icon);
