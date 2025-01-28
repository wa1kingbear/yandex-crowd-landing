export class Carousel {
    constructor(container, options) {
        this.container = document.querySelector(container);
        this.wrapper = null;
        this.slides = this.container.querySelectorAll(".carousel-slide");
        this.totalSlides = this.slides.length;
        this.activeSlideCount = 1;
        this.currentIndex = 0;
        this.options = {
            ...options,
            slidesPerView: options.slidesPerView || 1,
        };
        this.slideWidth = 0;

        this.init();
    }
    init() {
        this.setupCarousel();
        this.setupNavigation();
    }

    prevSlide() {
        const slides = this.wrapper.querySelectorAll(".carousel-slide");
        const offset = this.slideWidth;

        const style = window.getComputedStyle(this.wrapper);
        let matrix = new WebKitCSSMatrix(style.transform);

        const firstSlide = this.wrapper.querySelector(".slide-first");
        const firstSlidePrevSibling = firstSlide.previousElementSibling;

        if (firstSlidePrevSibling) {
            this.wrapper.style.transform = `translateX(${
                matrix.m41 + offset
            }px)`;
        } else {
            const lastSlide = slides[slides.length - 1];
            const parent = slides[0].parentNode;

            parent.insertBefore(lastSlide, parent.firstChild);

            parent.style.transitionDuration = "0s";
            this.wrapper.style.transform = `translateX(${
                matrix.m41 - offset
            }px)`;

            matrix = new WebKitCSSMatrix(style.transform);
            parent.style.transitionDuration = null;
            this.wrapper.style.transform = `translateX(${
                matrix.m41 + offset
            }px)`;
        }
        this.updateActiveSlides("prev");
    }

    nextSlide() {
        const slides = this.wrapper.querySelectorAll(".carousel-slide");
        const offset = this.slideWidth;

        const style = window.getComputedStyle(this.wrapper);
        let matrix = new WebKitCSSMatrix(style.transform);

        const lastSlide = this.wrapper.querySelector(".slide-last");
        const lastSlideNextSibling = lastSlide.nextElementSibling;

        if (lastSlideNextSibling) {
            this.wrapper.style.transform = `translateX(${
                matrix.m41 - offset
            }px)`;
        } else {
            const firstSlide = slides[0];
            const parent = slides[0].parentNode;

            parent.appendChild(firstSlide);

            parent.style.transitionDuration = "0s";
            this.wrapper.style.transform = `translateX(${
                matrix.m41 + offset
            }px)`;

            matrix = new WebKitCSSMatrix(style.transform);
            parent.style.transitionDuration = null;
            this.wrapper.style.transform = `translateX(${
                matrix.m41 - offset
            }px)`;
        }
        this.updateActiveSlides("next");
    }

    setupNavigation() {
        const navigation = this.options.navigation;
        if (navigation && navigation.prev && navigation.next) {
            const prevButton = document.querySelector(navigation.prev);
            const nextButton = document.querySelector(navigation.next);

            prevButton.addEventListener("click", () => this.prevSlide());
            nextButton.addEventListener("click", () => this.nextSlide());
        }
    }

    setupCarousel() {
        const container = this.container;
        const slides = this.slides;
        const slidesPerView = this.options.slidesPerView;

        container.classList.add("carousel");

        const carouselWrapper = document.createElement("div");
        carouselWrapper.classList.add("carousel-wrapper");
        carouselWrapper.style.transform = "translateX(0)";
        this.wrapper = carouselWrapper;
        this.slides.forEach((slide) => {
            carouselWrapper.appendChild(slide);
        });
        container.appendChild(carouselWrapper);

        slides[0].classList.add("slide-first");
        slides[slidesPerView - 1].classList.add("slide-last");

        this.setupSlidesWidth();
    }
    setupSlidesWidth() {
        const container = this.container;
        this.slides.forEach((item) => {
            item.style.width =
                container.offsetWidth / this.options.slidesPerView + "px";
            this.slideWidth =
                container.offsetWidth / this.options.slidesPerView;
        });
    }
    updateActiveSlides(direction = "next") {
        const wrapper = this.wrapper;
        const firstSlide = wrapper.querySelector(".slide-first");
        const lastSlide = wrapper.querySelector(".slide-last");

        if (direction === "next") {
            firstSlide.classList.remove("slide-first");
            firstSlide.nextElementSibling?.classList.add("slide-first");

            lastSlide.classList.remove("slide-last");
            lastSlide.nextElementSibling?.classList.add("slide-last");
        } else {
            firstSlide.classList.remove("slide-first");
            firstSlide.previousElementSibling?.classList.add("slide-first");

            lastSlide.classList.remove("slide-last");
            lastSlide.previousElementSibling?.classList.add("slide-last");
        }
    }
}
