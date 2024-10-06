import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#6C6C6C' }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99998 13.1663C10.1296 13.1663 12.6666 10.6293 12.6666 7.49967C12.6666 4.37007 10.1296 1.83301 6.99998 1.83301C3.87038 1.83301 1.33331 4.37007 1.33331 7.49967C1.33331 10.6293 3.87038 13.1663 6.99998 13.1663Z"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinejoin="round"
      />
      <path
        d="M11.0739 11.5742L13.9023 14.4027"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Icon);
