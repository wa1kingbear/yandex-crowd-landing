import { Carousel } from "./carousel";

export const participants = () => {
    new Carousel(".participants__slider__wrapper", {
        slidesPerView: 3,
        autoPlay: true,
        autoPlaySpeed: 2000,
        navigation: {
            prev: ".participants__slider__nav .prev",
            next: ".participants__slider__nav .next",
        },
        counter: {
            current: ".participants__slider__nav__counter__current",
            total: ".participants__slider__nav__counter__total",
        },
        responsive: [
            { breakpoint: 1024, slidesToShow: 2 },
            { breakpoint: 768, slidesToShow: 1 },
        ],
    });
};
