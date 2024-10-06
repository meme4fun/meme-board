import React, { memo } from 'react';
import SVG from '@/components/SVG';

interface IconProps {
  color?: string;
}

const Icon: React.FC<IconProps> = ({ color = '#888888' }) => {
  return (
    <SVG id="IconCheckBoxSelected">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_4313_30564)">
          <rect
            width="16"
            height="16"
            rx="2"
            fill="url(#paint0_linear_4313_30564)"
          />
          <path
            d="M11.8834 5.17789C11.993 5.06793 12.1406 5.00431 12.2958 5.00021C12.451 4.99611 12.6018 5.05185 12.717 5.15588C12.8323 5.25991 12.9031 5.40426 12.9148 5.55906C12.9265 5.71385 12.8782 5.86722 12.78 5.98742L12.7385 6.03338L7.6072 11.1647C7.50137 11.2705 7.36007 11.3333 7.21062 11.341C7.06117 11.3486 6.91418 11.3006 6.79808 11.2062L6.75212 11.1647L3.90145 8.31439C3.79134 8.20489 3.72758 8.05723 3.72337 7.902C3.71916 7.74678 3.77482 7.59588 3.87883 7.48057C3.98284 7.36526 4.12723 7.29438 4.28207 7.28262C4.43691 7.27086 4.59034 7.31911 4.71057 7.41739L4.75653 7.45891L7.17946 9.88144L11.8834 5.1783V5.17789Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_4313_30564"
            x1="0"
            y1="8"
            x2="16"
            y2="8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#4776E6" />
            <stop offset="1" stop-color="#8E54E9" />
          </linearGradient>
          <clipPath id="clip0_4313_30564">
            <rect width="16" height="16" rx="2" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
