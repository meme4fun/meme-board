import React, { memo } from 'react';

interface IconProps {
  color?: string;
}

const Icon: React.FC<IconProps> = ({ color = '#888888' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3H3.25L4 6L1.5 3ZM4 6L6.5 16H19.5L22 6H4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 21C7.32843 21 8 20.3284 8 19.5C8 18.6716 7.32843 18 6.5 18C5.67157 18 5 18.6716 5 19.5C5 20.3284 5.67157 21 6.5 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Icon);
