import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  success?: boolean;
}

const Icon: React.FC<IProps> = ({ success = false }) => {
  const color = success ? '#00A870' : '#333333';
  const color2 = success ? '#ffffff' : '#4B4B4B';
  return (
    <SVG id={'successStatus' + success}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00001 14.6663C9.84094 14.6663 11.5076 13.9201 12.714 12.7137C13.9205 11.5073 14.6667 9.84061 14.6667 7.99967C14.6667 6.15874 13.9205 4.49207 12.714 3.28563C11.5076 2.0792 9.84094 1.33301 8.00001 1.33301C6.15908 1.33301 4.49241 2.0792 3.28596 3.28563C2.07954 4.49207 1.33334 6.15874 1.33334 7.99967C1.33334 9.84061 2.07954 11.5073 3.28596 12.7137C4.49241 13.9201 6.15908 14.6663 8.00001 14.6663Z"
          fill={color}
        />
        <path
          d="M5.33334 8L7.33334 10L11.3333 6"
          stroke={color2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVG>
  );
};

export default memo(Icon);
