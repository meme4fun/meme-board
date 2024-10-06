import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#ffffff' }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3L6.8 8.60593V12.8148L9.2 14V8.60593L14 3H2Z"
        stroke={color}
        strokeWidth="1.33"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Icon);
