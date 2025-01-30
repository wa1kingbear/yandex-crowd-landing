import { Carousel } from "./carousel";

export const participants = () => {
    new Carousel(".participants__slider__wrapper", {
        slidesPerView: 3,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            prev: ".participants__slider__nav .prev",
            next: ".participants__slider__nav .next",
        },
        counter: {
            current: ".participants__slider__nav__counter__current",
            total: ".participants__slider__nav__counter__total",
        },
        responsive: [
            {
                breakpoint: 1023,
                slidesPerView: 1,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    prev: ".participants__slider__nav .prev",
                    next: ".participants__slider__nav .next",
                },
                counter: {
                    current: ".participants__slider__nav__counter__current",
                    total: ".participants__slider__nav__counter__total",
                },
            },
        ],
    });
};
