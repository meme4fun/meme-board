import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#ffffff' }) => {
  return (
    <SVG id="airdrop">
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3132_22797)">
          <path
            d="M5.5 15.9999C7.52579 14.7394 9.86406 14.0713 12.25 14.0713C14.6359 14.0713 16.9742 14.7394 19 15.9999"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 15.9999C21.0258 14.7394 23.3641 14.0713 25.75 14.0713C28.1359 14.0713 30.4742 14.7394 32.5 15.9999"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.5 16C5.5 9.37258 11.5442 4 19 4C26.4558 4 32.5 9.37258 32.5 16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 23.5L5.5 16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32.5 16L19 23.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.25 23.5H13.75C12.5074 23.5 11.5 24.5074 11.5 25.75V31.75C11.5 32.9926 12.5074 34 13.75 34H24.25C25.4926 34 26.5 32.9926 26.5 31.75V25.75C26.5 24.5074 25.4926 23.5 24.25 23.5Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 23.5V16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.3877 23.75H21.6127V27.7083C21.6127 27.9183 21.5293 28.1197 21.3808 28.2681C21.2324 28.4166 21.031 28.5 20.821 28.5H17.1794C16.9694 28.5 16.768 28.4166 16.6196 28.2681C16.4711 28.1197 16.3877 27.9183 16.3877 27.7083V23.75V23.75Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_3132_22797">
            <rect width="38" height="38" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
