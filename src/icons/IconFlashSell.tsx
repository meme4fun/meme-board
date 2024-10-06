import SVG from '@/components/SVG';
import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const Icon: React.FC<IProps> = ({}) => {
  return (
    <SVG id="flash-sell">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.18388 9.16549H3.50055C3.15022 9.16549 2.90855 8.81483 3.03322 8.48766L5.69955 1.48899C5.73562 1.39431 5.79961 1.31281 5.88304 1.25531C5.96647 1.19781 6.06539 1.16701 6.16672 1.16699H10.6661C11.0211 1.16699 11.2631 1.52666 11.1291 1.85549L9.57655 5.66616H12.4992C12.9291 5.66616 13.1584 6.17283 12.8749 6.49583L5.70922 14.6608C5.36088 15.0578 4.71505 14.7138 4.85022 14.2033L6.18388 9.16549Z"
          fill="currentColor"
        />
      </svg>
    </SVG>
  );
};

export default memo(Icon);
