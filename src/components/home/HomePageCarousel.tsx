import React, { memo, useRef, useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BackgroundImage, createStyles } from '@asuikit/core';
import { useRequest } from 'ahooks';
import { getBanners } from '@/services/api/meme4fun.api';

interface HomePageCarouselProps {
  _?: any;
}

const settings = {
  className: 'slider variable-width col-span-12',
  dots: true,
  infinite: true,
  centerMode: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};

const BigItemStyle = {
  right: -46,
  width: 480,
  height: 240,
};

const useStyle = createStyles((theme, params: { size: number }) => {
  const { size } = params;

  return {
    root: {
      paddingTop: 40,
      '.carousel-item': {
        width: 400,
        height: 200,
        border: '2px solid #000',
        position: 'absolute',
        right: 8,
        bottom: 20,
        boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        background: 'green',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      },
      '.slick-slide': {
        position: 'relative',
        height: 260,
      },
      '.slick-current': {
        '.carousel-item': {
          right: -46,
          width: 480,
          height: 240,
        },
      },
      '.slick-current + .slick-active': {
        '.carousel-item': {
          right: -20,
        },
      },
      '.slick-cloned[data-index="-1"] .carousel-item': {
        right: -46,
        width: 480,
        height: 240,
      },
      '.slick-cloned[data-index="-1"]:has(+ .slick-current) .carousel-item': {
        right: 8,
        bottom: 20,
        width: 400,
        height: 200,
      },
      '.slick-slide[data-index="0"]:not(.slick-active) .carousel-item': {
        right: -20,
      },
      '.slick-slide[data-index="0"]:has(+ .slick-current) .carousel-item': {
        right: 8,
      },
      [`.slick-slide[data-index="${size}"]:not(.slick-active) .carousel-item`]:
        {
          right: -46,
          width: 480,
          height: 240,
        },
      [`.slick-slide[data-index="${size + 1}"]:not(.slick-active) .carousel-item`]:
        {
          right: -20,
        },
    },
  };
});

const size = 2;

const HomePageCarousel: React.FC<HomePageCarouselProps> = () => {
  const { classes, cx } = useStyle({ size });
  const [current, setCurrent] = useState(0);

  const { data } = useRequest(async () => {
    return await getBanners();
  });

  const settings = {
    className: '',
    // centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 300,
    waitForAnimate: false,
    autoplaySpeed: 5000,
    autoplay: true,
    arrows: false,
    pauseOnFocus: true,
  };
  return (
    <div className={cx('col-span-12', classes.root)}>
      <Slider {...settings}>
        {data?.map((banner, index) => (
          <div key={index}>
            <div className="carousel-item">
              <img
                src={banner.link}
                width="100%"
                height="100%"
                alt=""
                onClick={() => {
                  window.open(banner.link);
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

  // return (
  //   <Slider {...settings} afterChange={setCurrent}>
  // {Array(10)
  //   .fill('')
  //   .map((_, index) => (
  //     <div
  //       key={index}
  //       style={{
  //         width: index === current ? 480 : 400,
  //         height: 200,
  //       }}
  //     >
  //       <div className="center bg-red-500">{index}</div>
  //     </div>
  //   ))}
  //   </Slider>
  // );
  // <Carousel
  //   // withIndicators
  //   height={200}
  //   slideSize="33.333333%"
  //   // slideGap="md"
  //   loop
  //   align="start"
  //   slidesToScroll={1}
  //   className="col-span-12"
  //   plugins={[autoplay.current]}
  //   onMouseEnter={autoplay.current.stop}
  //   onMouseLeave={autoplay.current.reset}
  //   onSlideChange={setIndex}
  // >
  //   <Carousel.Slide>
  //     <div className="h-[200px] w-[480] bg-red-700">1</div>
  //   </Carousel.Slide>
  //   <Carousel.Slide>
  //     <div className="h-[200px] bg-blue-700">2</div>
  //   </Carousel.Slide>
  //   <Carousel.Slide>
  //     <div className="h-[200px] bg-yellow-700">3</div>
  //   </Carousel.Slide>
  //   <Carousel.Slide>
  //     <div className="h-[200px] bg-red-700">1</div>
  //   </Carousel.Slide>
  //   <Carousel.Slide>
  //     <div className="h-[200px] bg-blue-700">2</div>
  //   </Carousel.Slide>
  //   <Carousel.Slide>
  //     <div className="h-[200px] bg-yellow-700">3</div>
  //   </Carousel.Slide>
  //   {/* ...other slides */}
  // </Carousel>
};

export default memo(HomePageCarousel);
