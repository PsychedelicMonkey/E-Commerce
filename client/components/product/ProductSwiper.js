import React from 'react';
import Image from 'next/image';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductSwiper = ({ images }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`http://localhost:1337${img.formats.medium.url}`}
              width={img.formats.medium.width}
              height={img.formats.medium.height}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSwiper;
