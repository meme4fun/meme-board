import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  startColor?: string;
  endColor?: string;
}

const Icon: React.FC<IProps> = ({
  startColor = '#4776E6',
  endColor = '#8E54E9',
}) => {
  return (
    <SVG id="radio-selected">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.9918 0.0078125C3.57805 0.0078125 0 3.58587 0 7.99961C0 12.4134 3.57805 15.9914 7.9918 15.9914C12.4056 15.9914 15.9836 12.4134 15.9836 7.99961C15.9836 3.58587 12.4055 0.0078125 7.9918 0.0078125ZM12.5757 5.92663L7.40699 11.0954C7.40699 11.0954 7.40692 11.0954 7.40683 11.0955C7.16854 11.3339 6.80521 11.3711 6.52783 11.2073C6.47646 11.1769 6.42802 11.1396 6.38391 11.0955C6.38388 11.0955 6.38381 11.0954 6.38381 11.0954L3.40793 8.11955C3.12546 7.83709 3.12546 7.37906 3.40793 7.09654C3.69039 6.81407 4.14841 6.81407 4.43088 7.09654L6.89542 9.56108L11.5528 4.90371C11.8353 4.62125 12.2933 4.62125 12.5758 4.90371C12.8582 5.18618 12.8582 5.64417 12.5757 5.92663Z"
          fill="url(#paint0_linear_2013_5704)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2013_5704"
            x1="0"
            y1="7.99961"
            x2="15.9836"
            y2="7.99961"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>
    </SVG>
  );
};

export default Icon;
