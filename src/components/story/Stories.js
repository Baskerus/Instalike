import React from "react";
import AddStory from "./AddStory";
import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";

export default function Stories() {
  return (
    <div className="relative mt-16 px-2 w-full text-xl font-bold z-9">
      <Swiper
        slidesPerView={4}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide className="flex items-center justify-center">
          <AddStory />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Story seen={true} />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Story />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Story />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
