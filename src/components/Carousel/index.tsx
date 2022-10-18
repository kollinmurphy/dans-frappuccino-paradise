/* @jsxImportSource solid-js */

import { createEffect } from "solid-js";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 800;

const images = [
  `https://picsum.photos/id/431/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`,
  `https://picsum.photos/id/1060/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`,
  `https://picsum.photos/id/425/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`,
  `https://picsum.photos/id/225/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`,
  `https://picsum.photos/id/42/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`,
  `https://picsum.photos/id/2/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`,
];

const SLIDE_CHANGE_INTERVAL = 5000;

export default function Carousel() {
  createEffect(() => {
    let timer: any;
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      modules: [Navigation, Pagination],
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    const setTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        swiper.slideNext();
      }, SLIDE_CHANGE_INTERVAL);
    };

    swiper.on("navigationNext", setTimer);
    swiper.on("navigationPrev", setTimer);
    swiper.on("paginationUpdate", setTimer);
    setTimer();
  });

  return (
    <div class="swiper my-8 w-[calc(100vw-96px)] h-[calc(100vh-168px)]">
      <div class="swiper-wrapper">
        {images.map((i) => (
          <div class="swiper-slide flex items-start justify-center">
            <img
              src={i}
              alt="image"
              class="rounded-lg w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev text-primary"></div>
      <div class="swiper-button-next text-primary"></div>

      <div class="swiper-scrollbar"></div>
    </div>
  );
}
