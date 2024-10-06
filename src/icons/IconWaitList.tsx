import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#ffffff' }) => {
  return (
    <SVG id="waitList">
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3129_22647)">
          <path
            d="M29.2731 27.4878H26.5225"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.9597 33.5834C30.5677 33.5834 33.4925 30.6585 33.4925 27.0505C33.4925 23.4425 30.5677 20.5176 26.9597 20.5176C23.3516 20.5176 20.4268 23.4425 20.4268 27.0505C20.4268 30.6585 23.3516 33.5834 26.9597 33.5834Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5137 16.1621H26.3207"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.1584 32.1316H13.2549C11.3297 32.1316 9.48342 31.3668 8.12214 30.0055C6.76085 28.6442 5.99609 26.798 5.99609 24.8728V13.2588C5.99609 11.3336 6.76085 9.48733 8.12214 8.12604C9.48342 6.76476 11.3297 6 13.2549 6H24.8689C26.794 6 28.6403 6.76476 30.0016 8.12604C31.3629 9.48733 32.1277 11.3336 32.1277 13.2588V17.614"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.8027 15.7644L13.1369 16.9665L15.8226 14.5479"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.8027 23.0232L13.1369 24.2253L15.8226 21.8066"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.5225 27.4878V24.1738"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_3129_22647">
            <rect width="38" height="38" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
