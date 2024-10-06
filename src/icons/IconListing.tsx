import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#ffffff' }) => {
  return (
    <SVG id="listing">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.0562 9.74772L9.7542 14.0497C9.52914 14.275 9.2237 14.4016 8.9052 14.4016C8.5867 14.4016 8.2813 14.275 8.0562 14.0497L2.6665 8.66602V2.66602H8.6665L14.0562 8.05572C14.5215 8.52375 14.5215 9.27968 14.0562 9.74772Z"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.16683 7.00065C6.62706 7.00065 7.00016 6.62755 7.00016 6.16732C7.00016 5.70708 6.62706 5.33398 6.16683 5.33398C5.7066 5.33398 5.3335 5.70708 5.3335 6.16732C5.3335 6.62755 5.7066 7.00065 6.16683 7.00065Z"
          fill={color}
        />
      </svg>
    </SVG>
  );
};

export default memo(Icon);
