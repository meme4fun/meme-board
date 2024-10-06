import React, { memo } from 'react';

interface IProps {
  startColor?: string;
  endColor?: string;
  size?: number;
}

const IconCopy: React.FC<IProps> = ({
  startColor = '#4776E6',
  endColor = '#8E54E9',
  size = 16,
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2.604c0-.15.121-.27.27-.27h8.126c.15 0 .27.12.27.27v8.125a.27.27 0 0 1-.27.271h-1.063V5.27c0-.885-.718-1.603-1.604-1.603H5V2.604ZM3.667 3.667V2.604C3.667 1.718 4.385 1 5.27 1h8.125C14.282 1 15 1.718 15 2.604v8.125c0 .886-.718 1.604-1.604 1.604h-1.063v1.063c0 .886-.718 1.604-1.604 1.604H2.604A1.604 1.604 0 0 1 1 13.396V5.27c0-.886.718-1.604 1.604-1.604h1.063ZM2.333 5.27c0-.15.121-.271.27-.271h8.126c.15 0 .27.121.27.27v8.126a.27.27 0 0 1-.27.27H2.604a.27.27 0 0 1-.27-.27V5.27Z"
        fill="url(#a)"
      />
      <defs>
        <linearGradient
          id="a"
          x1="1"
          y1="8"
          x2="15"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={startColor} />
          <stop offset="1" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default memo(IconCopy);
