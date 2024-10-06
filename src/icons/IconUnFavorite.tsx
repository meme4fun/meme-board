import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({ color = '#888888' }) => {
  return (
    <SVG id="down">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.7757 18.8492C10.9365 19.0101 11.1274 19.1377 11.3375 19.2248C11.5476 19.3118 11.7728 19.3567 12.0002 19.3567C12.2277 19.3567 12.4529 19.3118 12.663 19.2248C12.8731 19.1377 13.064 19.0101 13.2248 18.8492L19.8268 12.2472C20.2527 11.8337 20.5922 11.3396 20.8254 10.7938C21.0586 10.2479 21.181 9.66109 21.1854 9.0675C21.1898 8.4739 21.0761 7.88536 20.851 7.3361C20.6258 6.78684 20.2937 6.28782 19.874 5.86807C19.4542 5.44833 18.9552 5.11623 18.406 4.89109C17.8567 4.66596 17.2682 4.55228 16.6746 4.55666C16.081 4.56105 15.4942 4.68342 14.9483 4.91666C14.4024 5.14989 13.9084 5.48933 13.4949 5.91524L13.436 5.97413C13.0552 6.35484 12.5387 6.56871 12.0002 6.56871C11.4618 6.56871 10.9453 6.35484 10.5645 5.97413L10.5056 5.91524C10.0921 5.48933 9.59805 5.14989 9.05218 4.91666C8.50631 4.68342 7.91951 4.56105 7.32592 4.55666C6.73232 4.55228 6.14378 4.66596 5.59452 4.89109C5.04526 5.11623 4.54624 5.44833 4.1265 5.86807C3.70675 6.28782 3.37465 6.78684 3.14951 7.3361C2.92438 7.88536 2.8107 8.4739 2.81509 9.0675C2.81948 9.66109 2.94185 10.2479 3.17508 10.7938C3.40831 11.3396 3.74775 11.8337 4.17366 12.2472L10.7757 18.8502V18.8492ZM10.0578 19.5681L3.45477 12.9651C2.44195 11.9313 1.878 10.5396 1.88545 9.09242C1.8929 7.64521 2.47115 6.25942 3.49456 5.23614C4.51797 4.21287 5.90384 3.6348 7.35104 3.62754C8.79825 3.62027 10.1899 4.18441 11.2235 5.19736L11.2824 5.25524C11.4728 5.44559 11.731 5.55253 12.0002 5.55253C12.2695 5.55253 12.5277 5.44559 12.7181 5.25524L12.777 5.19635C13.8108 4.18353 15.2024 3.61958 16.6497 3.62703C18.0969 3.63448 19.4827 4.21273 20.5059 5.23614C21.5292 6.25954 22.1073 7.64542 22.1145 9.09262C22.1218 10.5398 21.5577 11.9314 20.5447 12.9651L13.9427 19.5681C13.6876 19.8232 13.3848 20.0256 13.0515 20.1637C12.7182 20.3018 12.361 20.3728 12.0002 20.3728C11.6395 20.3728 11.2823 20.3018 10.949 20.1637C10.6157 20.0256 10.3129 19.8232 10.0578 19.5681Z"
          fill={color}
        />
      </svg>
    </SVG>
  );
};

export default memo(Icon);
