import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
  stopColor?: string;
}

const Icon: React.FC<IProps> = ({
  color = '#4776E6',
  stopColor = '#8E54E9',
}) => {
  return (
    <SVG id="favorite">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0578 19.5681L3.45477 12.9651C2.44195 11.9313 1.878 10.5396 1.88545 9.09242C1.8929 7.64521 2.47115 6.25942 3.49456 5.23614C4.51797 4.21287 5.90384 3.6348 7.35104 3.62754C8.79825 3.62027 10.1899 4.18441 11.2235 5.19736L11.2824 5.25524C11.4728 5.44559 11.731 5.55253 12.0002 5.55253C12.2695 5.55253 12.5277 5.44559 12.7181 5.25524L12.777 5.19635C13.8108 4.18353 15.2024 3.61958 16.6497 3.62703C18.0969 3.63448 19.4827 4.21273 20.5059 5.23614C21.5292 6.25954 22.1073 7.64542 22.1145 9.09262C22.1218 10.5398 21.5577 11.9314 20.5447 12.9651L13.9427 19.5681C13.6876 19.8232 13.3848 20.0256 13.0515 20.1637C12.7182 20.3018 12.361 20.3728 12.0002 20.3728C11.6395 20.3728 11.2823 20.3018 10.949 20.1637C10.6157 20.0256 10.3129 19.8232 10.0578 19.5681Z"
          fill="url(#paint0_linear_2220_16822)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2220_16822"
            x1="1.88538"
            y1="11.9999"
            x2="22.1146"
            y2="11.9999"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4776E6" />
            <stop offset="1" stopColor="#8E54E9" />
          </linearGradient>
        </defs>
      </svg>
    </SVG>
  );
};

export default memo(Icon);
