import SVG from '@/components/SVG';
import { Box } from '@asuikit/core';
import React, { memo } from 'react';

interface IProps {
  width?: number;
  height?: number;
}

const Icon: React.FC<IProps> = ({ width = 16, height = 12 }) => {
  return (
    <SVG id="icon-assets-accept">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          stroke="url(#paint0_linear_2145_21090)"
          strokeLinejoin="round"
          strokeWidth="1.333"
          d="M2 4.2v9.467c0 .368.298.667.667.667h10.666a.667.667 0 00.667-.667V4.2H2z"
        ></path>
        <path
          stroke="url(#paint1_linear_2145_21090)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.333"
          d="M14 4.2l-1.889-2.533H3.89L2 4.2"
        ></path>
        <path
          stroke="url(#paint2_linear_2145_21090)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.333"
          d="M10.518 6.4c0 1.4-1.127 2.534-2.518 2.534A2.526 2.526 0 015.481 6.4"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_2145_21090"
            x1="2"
            x2="14"
            y1="9.267"
            y2="9.267"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4776E6"></stop>
            <stop offset="1" stopColor="#8E54E9"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_2145_21090"
            x1="2"
            x2="14"
            y1="2.934"
            y2="2.934"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4776E6"></stop>
            <stop offset="1" stopColor="#8E54E9"></stop>
          </linearGradient>
          <linearGradient
            id="paint2_linear_2145_21090"
            x1="5.481"
            x2="10.518"
            y1="7.667"
            y2="7.667"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4776E6"></stop>
            <stop offset="1" stopColor="#8E54E9"></stop>
          </linearGradient>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
