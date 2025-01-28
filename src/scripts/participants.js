import { Carousel } from "./carousel";

export const participants = () => {
    new Carousel(".participants__slider__wrapper", {
        slidesPerView: 1,
        autoPlay: true,
        autoPlaySpeed: 2000,
        navigation: {
            prev: ".participants__slider__nav .prev",
            next: ".participants__slider__nav .next",
        },
        responsive: [
            { breakpoint: 1024, slidesToShow: 2 },
            { breakpoint: 768, slidesToShow: 1 },
        ],
    });
};
