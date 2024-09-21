"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
const AuthCarousel = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <div className='mb-6 text-4xl font-mono text-right'>Özel Yazılım Geliştirme</div>
            <div className='text-2xl font-mono text-right'>İşinize tam uyumlu, ölçeklenebilir ve güvenilir yazılım çözümleriyle iş verimliliğinizi artırın.</div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  )
}

export default AuthCarousel