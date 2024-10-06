import React, { memo } from 'react';

interface IProps {
  startColor?: string;
  endColor?: string;
}

const ShareIcon: React.FC<IProps> = ({
  startColor = '#4776E6',
  endColor = '#8E54E9',
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
      <path
        stroke="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M9.333 2H14v4.667"
      ></path>
      <path
        stroke="url(#b)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M14 9.825V13a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h3"
      ></path>
      <path
        stroke="url(#c)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M8.6 7.4l5.1-5.1"
      ></path>
      <defs>
        <linearGradient
          id="a"
          x1="9.333"
          x2="14"
          y1="4.333"
          y2="4.333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor}></stop>
          <stop offset="1" stopColor={endColor}></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="2"
          x2="14"
          y1="8"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor}></stop>
          <stop offset="1" stopColor={endColor}></stop>
        </linearGradient>
        <linearGradient
          id="c"
          x1="8.6"
          x2="13.7"
          y1="4.85"
          y2="4.85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor}></stop>
          <stop offset="1" stopColor={endColor}></stop>
        </linearGradient>
      </defs>
    </svg>
  );
  /* return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.3335 12H24.0002V16.6667"
        stroke="url(#paint0_linear_1005_7884)"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 19.8246V23C24 23.5523 23.5523 24 23 24H13C12.4477 24 12 23.5523 12 23V13C12 12.4477 12.4477 12 13 12H16"
        stroke="url(#paint1_linear_1005_7884)"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6001 17.4L23.7001 12.3"
        stroke="url(#paint2_linear_1005_7884)"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1005_7884"
          x1="19.3335"
          y1="14.3333"
          x2="24.0002"
          y2="14.3333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor} />
          <stop offset="1" stop-color={endColor} />
        </linearGradient>
        <linearGradient id="paint1_linear_1005_7884" x1="12" y1="18" x2="24" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor={startColor} />
          <stop offset="1" stop-color={endColor} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1005_7884"
          x1="18.6001"
          y1="14.85"
          x2="23.7001"
          y2="14.85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor} />
          <stop offset="1" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  ); */
};

export default memo(ShareIcon);
