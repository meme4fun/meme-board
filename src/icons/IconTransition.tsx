import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  startColor?: string;
  endColor?: string;
}

const Icon: React.FC<IProps> = ({
  startColor = '#4776E6',
  endColor = '#8E54E9',
}) => {
  return (
    <SVG id="transition">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z"
          stroke="url(#paint0_linear_2011_14350)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 7H11"
          stroke="url(#paint1_linear_2011_14350)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 9H11"
          stroke="url(#paint2_linear_2011_14350)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 6.99984L8.66666 4.6665"
          stroke="url(#paint3_linear_2011_14350)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.33333 11.3333L5 9"
          stroke="url(#paint4_linear_2011_14350)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2011_14350"
            x1="2"
            y1="8"
            x2="14"
            y2="8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2011_14350"
            x1="5"
            y1="7.5"
            x2="11"
            y2="7.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2011_14350"
            x1="5"
            y1="9.5"
            x2="11"
            y2="9.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2011_14350"
            x1="8.66666"
            y1="5.83317"
            x2="11"
            y2="5.83317"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
          <linearGradient
            id="paint4_linear_2011_14350"
            x1="5"
            y1="10.1667"
            x2="7.33333"
            y2="10.1667"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
