import React, { memo } from 'react';

interface IProps {
  color?: string;
}

const QuestionIcon: React.FC<IProps> = ({ color = '#888888' }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99961 0.112976C4.85742 0.112976 3.74089 0.451674 2.79119 1.08624C1.8415 1.7208 1.1013 2.62274 0.664208 3.67798C0.227112 4.73322 0.112747 5.89438 0.335577 7.01462C0.558407 8.13486 1.10842 9.16387 1.91607 9.97152C2.72372 10.7792 3.75272 11.3292 4.87297 11.552C5.99321 11.7748 7.15437 11.6605 8.20961 11.2234C9.26485 10.7863 10.1668 10.0461 10.8013 9.09639C11.4359 8.1467 11.7746 7.03016 11.7746 5.88798C11.7746 4.35635 11.1662 2.88746 10.0832 1.80443C9.00013 0.721412 7.53124 0.112976 5.99961 0.112976V0.112976ZM6.36361 8.72298C6.24823 8.83188 6.09527 8.89206 5.93661 8.89098C5.85726 8.89252 5.77843 8.87779 5.70499 8.84769C5.63155 8.81759 5.56506 8.77276 5.50961 8.71598C5.45336 8.66159 5.40881 8.59628 5.37872 8.52406C5.34862 8.45183 5.33361 8.37421 5.33461 8.29598C5.33139 8.21744 5.34539 8.13916 5.37562 8.06661C5.40585 7.99405 5.45158 7.92899 5.50961 7.87598C5.56565 7.82045 5.63241 7.77692 5.70582 7.74804C5.77924 7.71915 5.85776 7.70552 5.93661 7.70798C6.01658 7.70497 6.09631 7.71832 6.17094 7.74721C6.24557 7.7761 6.31351 7.81991 6.37061 7.87598C6.42864 7.92899 6.47437 7.99405 6.5046 8.06661C6.53483 8.13916 6.54883 8.21744 6.54561 8.29598C6.5468 8.37695 6.53124 8.4573 6.49993 8.53198C6.46861 8.60666 6.4222 8.67407 6.36361 8.72998V8.72298ZM7.55361 5.50298C7.33257 5.73063 7.09886 5.94564 6.85361 6.14698C6.70967 6.26276 6.59264 6.40846 6.51061 6.57398C6.42001 6.74149 6.3742 6.92956 6.37761 7.11998V7.25998H5.50261V7.11998C5.4928 6.84876 5.55053 6.57936 5.67061 6.33598C5.91984 5.9424 6.23199 5.59241 6.59461 5.29998L6.73461 5.14598C6.8778 4.9774 6.95927 4.76507 6.96561 4.54398C6.96151 4.30341 6.86647 4.07332 6.69961 3.89998C6.60526 3.81438 6.49469 3.74859 6.37445 3.70651C6.25421 3.66442 6.12675 3.6469 5.99961 3.65498C5.84625 3.64215 5.69213 3.66813 5.55145 3.73052C5.41077 3.79291 5.28806 3.8897 5.19461 4.01198C5.0327 4.26111 4.95425 4.5553 4.97061 4.85198H4.13061C4.119 4.59584 4.15885 4.33998 4.24782 4.09951C4.3368 3.85905 4.47308 3.63886 4.64861 3.45198C4.8393 3.27115 5.06499 3.13129 5.31179 3.04099C5.55858 2.9507 5.82125 2.9119 6.08361 2.92698C6.5572 2.88646 7.02827 3.02929 7.39961 3.32598C7.56609 3.47309 7.69724 3.65586 7.78329 3.86069C7.86934 4.06551 7.90808 4.28711 7.89661 4.50898C7.89943 4.87194 7.77845 5.22502 7.55361 5.50998V5.50298Z"
        fill={color}
      />
    </svg>
  );
};

export default memo(QuestionIcon);