export class Carousel {
    constructor(container, options) {
        this.container = document.querySelector(container);
        this.wrapper = null;
        this.slides = this.container.querySelectorAll(".carousel-slide");
        this.totalSlides = this.slides.length;
        this.activeSlideCount = 1;
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
        const offset = this.slideWidth * this.options.slidesPerView;
        const count = this.activeSlideCount;

        const style = window.getComputedStyle(this.wrapper);
        const matrix = new WebKitCSSMatrix(style.transform);

        if (this.activeSlideCount > 1) {
            this.activeSlideCount = count - 1;
            this.wrapper.style.transform = `translateX(${
                matrix.m41 + offset
            }px)`;
        }
    }

    nextSlide() {
        const offset = this.slideWidth * this.options.slidesPerView;
        const count = this.activeSlideCount;
        const maxCount = this.totalSlides / this.options.slidesPerView;

        const style = window.getComputedStyle(this.wrapper);
        const matrix = new WebKitCSSMatrix(style.transform);

        if (this.activeSlideCount < maxCount) {
            this.activeSlideCount = count + 1;
            this.wrapper.style.transform = `translateX(${
                matrix.m41 - offset
            }px)`;
        }
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
        container.classList.add("carousel");

        const carouselWrapper = document.createElement("div");
        carouselWrapper.classList.add("carousel-wrapper");
        carouselWrapper.style.transform = "translateX(0)";
        this.wrapper = carouselWrapper;
        this.slides.forEach((slide) => {
            carouselWrapper.appendChild(slide);
        });
        container.appendChild(carouselWrapper);

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

        // this.activeSlideCount = this.totalSlides / this.options.slidesPerView;
    }
}
