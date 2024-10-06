import React, { memo } from 'react';

interface IconProps {
  color?: string;
}

const Icon: React.FC<IconProps> = ({ color = '#6C6C6C' }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke={color} />
    </svg>
  );
};

export default memo(Icon);
