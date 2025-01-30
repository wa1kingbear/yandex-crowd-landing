export class Carousel {
    constructor(container, options) {
        this.container = document.querySelector(container);
        this.wrapper = null;
        this.slides = this.container.querySelectorAll(".carousel-slide");
        this.boundSetupSlidesWidth = null;
        this.totalSlides = this.slides.length;
        this.activeSlideCount = 1;
        this.currentIndex = 0;
        this.options = {
            ...options,
            slidesPerView: options.slidesPerView || 1,
        };
        this.counter =
            this.options.counter?.current && this.options.counter?.total
                ? this.options.counter
                : null;
        this.slideWidth = 0;
        this.autoplayInterval = null;
        this.boundStopAutoplayOnResize = null;
        this.destroy = false;
        this.breakpoint = null;
        this.resizeTimeout = null;

        const checkResponsive = () => {
            if (!this.options.responsive) return;

            const updateCarousel = () => {
                const windowWidth = window.innerWidth;
                const responsive = options.responsive;

                const getCurrentBreakpoint = (width) => {
                    for (let bp of responsive) {
                        if (width <= bp.breakpoint) {
                            return bp;
                        }
                    }
                    return options;
                };

                const matchedConfig = getCurrentBreakpoint(windowWidth);

                if (
                    matchedConfig &&
                    this.breakpoint !== matchedConfig.breakpoint
                ) {
                    if (!matchedConfig.breakpoint) {
                        this.breakpoint = null;
                    } else {
                        this.breakpoint = matchedConfig.breakpoint;
                    }

                    if (matchedConfig.disable) {
                        this.destroyCarousel();
                        return;
                    }
                    this.options = {
                        ...matchedConfig,
                        slidesPerView: matchedConfig.slidesPerView || 1,
                    };
                    if (this.destroy && !matchedConfig.disable) {
                        this.destroy = null;
                        this.init();
                    }
                }
            };

            window.addEventListener("resize", updateCarousel);

            updateCarousel();
        };
        checkResponsive();

        !this.destroy && this.init();
    }

    init() {
        this.setupCarousel();
        this.setupNavigation();
        this.counter && this.setupCounter();
        this.setupAutoplay();
        this.setupTouchEvents();
        this.options.pagination && this.setupPagination();
    }

    stopAutoplayOnResize() {
        this.destroyAutoplay();
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (
                !this.destroy &&
                this.options.autoplay &&
                this.options.autoplay.delay
            )
                this.startAutoplay();
        }, 300);
    }

    destroyPagination() {
        const paginationContainer = document.querySelector(
            this.options.pagination
        );
        paginationContainer.innerHTML = "";
    }
    setupPagination() {
        const paginationContainer = document.querySelector(
            this.options.pagination
        );
        paginationContainer.classList.add("carousel-pagination");
        for (let i = 0; i < this.slides.length; i++) {
            const bullet = document.createElement("div");
            bullet.classList.add("carousel-bullet");
            paginationContainer.appendChild(bullet);
        }
        document.querySelector(".carousel-bullet").classList.add("active");
    }

    destroyAutoplay() {
        this.stopAutoplay();
    }
    setupAutoplay() {
        if (this.options.autoplay && this.options.autoplay.delay) {
            this.setupVisibilityListener();
            this.startAutoplay();

            this.wrapper.addEventListener("mouseenter", () => {
                clearInterval(this.autoplayInterval);
            });

            this.wrapper.addEventListener("mouseleave", () => {
                this.startAutoplay();
            });

            this.boundStopAutoplayOnResize =
                this.stopAutoplayOnResize.bind(this);
            window.addEventListener("resize", this.boundStopAutoplayOnResize);
        }
    }
    setupVisibilityListener() {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.stopAutoplay();
            } else if (this.options.autoplay) {
                this.startAutoplay();
            }
        });
    }
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplay.delay);
    }
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    destroyCounter() {
        const current = document.querySelector(this.counter.current);
        const total = document.querySelector(this.counter.total);

        current.textContent = "";
        total.textContent = "";
    }
    setupCounter() {
        const current = document.querySelector(this.counter.current);
        const total = document.querySelector(this.counter.total);

        current.textContent = "1";
        total.textContent = this.slides.length;
    }

    changeCurrentCounterSlide() {
        const index = Array.from(this.slides).findIndex((slide) =>
            slide.classList.contains("slide-first")
        );
        const current = document.querySelector(this.counter.current);

        current.textContent = index + 1;
    }
    changeCurrentPaginationBullet() {
        const index = Array.from(this.slides).findIndex((slide) =>
            slide.classList.contains("slide-first")
        );
        const pagination = document.querySelector(this.options.pagination);
        const bullets = pagination.querySelectorAll(".carousel-bullet");
        bullets.forEach((bullet) => {
            bullet.classList.remove("active");
        });
        bullets[index].classList.add("active");
    }

    destroyTouchEvents() {
        this.wrapper.removeEventListener("touchstart", this.handleTouchStart);
        this.wrapper.removeEventListener("touchmove", this.handleTouchMove);
        this.wrapper.removeEventListener("touchend", this.handleTouchEnd);
    }
    setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        };
        this.handleTouchMove = (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX - startX;
        };
        this.handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            if (currentX > 50) {
                this.prevSlide();
            } else if (currentX < -50) {
                this.nextSlide();
            }
        };

        this.wrapper.addEventListener("touchstart", this.handleTouchStart);
        this.wrapper.addEventListener("touchmove", this.handleTouchMove);
        this.wrapper.addEventListener("touchend", this.handleTouchEnd);
    }

    prevSlide() {
        if (!this.destroy) {
            this.stopAutoplay();
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
                setTimeout(() => {
                    parent.style.transitionDuration = null;
                    this.wrapper.style.transform = `translateX(${
                        matrix.m41 + offset
                    }px)`;
                }, 50);
            }
            this.updateActiveSlides("prev");

            if (this.options.autoplay && this.options.autoplay.delay) {
                this.startAutoplay();
            }
        }
    }

    nextSlide() {
        if (!this.destroy) {
            this.stopAutoplay();
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
                setTimeout(() => {
                    parent.style.transitionDuration = null;
                    this.wrapper.style.transform = `translateX(${
                        matrix.m41 - offset
                    }px)`;
                }, 50);
            }
            this.updateActiveSlides("next");

            if (this.options.autoplay && this.options.autoplay.delay) {
                this.startAutoplay();
            }
        }
    }

    destroyNavigation() {
        const prevButton = document.querySelector(navigation.prev);
        const nextButton = document.querySelector(navigation.next);

        prevButton?.removeEventListener("click", () => this.prevSlide());
        nextButton?.removeEventListener("click", () => this.nextSlide());
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

    destroyCarousel() {
        this.destroy = true;

        if (this.wrapper) {
            this.wrapper.remove();
            this.wrapper = null;

            this.slides.forEach((slide) => {
                slide.classList.remove("slide-first", "slide-last");
                slide.removeAttribute("style");
                this.container.appendChild(slide);
            });

            if (this.options.pagination) {
                this.destroyPagination();
            }
            if (this.options.autoplay) {
                this.destroyAutoplay();
            }
            if (this.counter?.current && this.counter?.total) {
                this.destroyCounter();
            }

            if (
                this.options.navigation &&
                this.options.navigation?.prev &&
                this.options.navigation?.next
            ) {
                this.destroyNavigation();
            }

            window.removeEventListener("resize", this.boundSetupSlidesWidth);
            window.removeEventListener(
                "resize",
                this.boundStopAutoplayOnResize
            );
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

        this.boundSetupSlidesWidth = this.setupSlidesWidth.bind(this);

        window.addEventListener("resize", this.boundSetupSlidesWidth);

        this.boundSetupSlidesWidth();
    }
    setupSlidesWidth() {
        const container = this.container;
        const wrapper = this.wrapper;
        this.slides?.forEach((item) => {
            item.style.width =
                container.offsetWidth / this.options.slidesPerView + "px";
            this.slideWidth =
                container.offsetWidth / this.options.slidesPerView;
        });

        this.wrapper.style.transform = `translateX(0px)`;
        if (this.counter && this.counter.current && this.counter.total) {
            document.querySelector(this.counter.current).textContent = "1";
        }

        this.slides.forEach((slide) => {
            slide.classList.remove("slide-first", "slide-last");
        });

        this.slides[0].classList.add("slide-first");
        this.slides[this.options.slidesPerView - 1].classList.add("slide-last");
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

        if (
            this.options.counter &&
            this.options.counter?.current &&
            this.options.counter?.total
        ) {
            this.changeCurrentCounterSlide();
        }
        if (this.options.pagination) {
            this.changeCurrentPaginationBullet();
        }
    }
}
