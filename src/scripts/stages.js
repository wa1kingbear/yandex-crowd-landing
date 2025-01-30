import { Carousel } from "./carousel";

export const stages = () => {
    new Carousel(".stages__slider__container", {
        disable: true,
        responsive: [
            {
                disable: false,
                breakpoint: 1023,
                slidesPerView: 1,
                navigation: {
                    prev: ".stages__slider__nav .prev",
                    next: ".stages__slider__nav .next",
                },
                pagination: ".stages__slider__nav__pagination",
            },
        ],
    });
};
