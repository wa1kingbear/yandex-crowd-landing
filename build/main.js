/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/main.scss */ \"./src/sass/main.scss\");\n/* harmony import */ var _scripts_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/index.js */ \"./src/scripts/index.js\");\n\n\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/index.js?");

/***/ }),

/***/ "./src/scripts/about.js":
/*!******************************!*\
  !*** ./src/scripts/about.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   about: () => (/* binding */ about)\n/* harmony export */ });\nconst about = () => {\n  const titlePart = document.querySelector(\".about__heading__title__dynamic\");\n  const titleMobile = document.querySelector(\".about__heading__title.mobile p\");\n  const resize = () => {\n    const width = window.innerWidth;\n    if (width <= 1023) {\n      titleMobile.innerHTML = titlePart.innerHTML;\n    } else {\n      titleMobile.textContent = \"\";\n    }\n  };\n  window.addEventListener(\"resize\", () => resize());\n  resize();\n};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/about.js?");

/***/ }),

/***/ "./src/scripts/anchors.js":
/*!********************************!*\
  !*** ./src/scripts/anchors.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   anchors: () => (/* binding */ anchors)\n/* harmony export */ });\nconst anchors = () => {\n  const buttons = document.querySelectorAll(\".anchor-button\");\n  buttons.forEach(button => {\n    button.addEventListener(\"click\", e => {\n      e.preventDefault();\n      const anchor = e.target.dataset.anchor;\n      const targetElement = document.getElementById(anchor);\n      if (targetElement) {\n        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;\n        window.scrollTo({\n          top: targetPosition - 50,\n          behavior: \"smooth\"\n        });\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/anchors.js?");

/***/ }),

/***/ "./src/scripts/carousel.js":
/*!*********************************!*\
  !*** ./src/scripts/carousel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Carousel: () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\n  constructor(container, options) {\n    this.container = document.querySelector(container);\n    this.wrapper = null;\n    this.slides = this.container.querySelectorAll(\".carousel-slide\");\n    this.boundSetupSlidesWidth = null;\n    this.totalSlides = this.slides.length;\n    this.activeSlideCount = 1;\n    this.currentIndex = 0;\n    this.options = {\n      ...options,\n      slidesPerView: options.slidesPerView || 1\n    };\n    this.counter = this.options.counter?.current && this.options.counter?.total ? this.options.counter : null;\n    this.slideWidth = 0;\n    this.autoplayInterval = null;\n    this.boundStopAutoplayOnResize = null;\n    this.destroy = false;\n    this.breakpoint = null;\n    this.resizeTimeout = null;\n    const checkResponsive = () => {\n      if (!this.options.responsive) return;\n      const updateCarousel = () => {\n        const windowWidth = window.innerWidth;\n        const responsive = options.responsive;\n        const getCurrentBreakpoint = width => {\n          for (let bp of responsive) {\n            if (width <= bp.breakpoint) {\n              return bp;\n            }\n          }\n          return options;\n        };\n        const matchedConfig = getCurrentBreakpoint(windowWidth);\n        if (matchedConfig && this.breakpoint !== matchedConfig.breakpoint) {\n          if (!matchedConfig.breakpoint) {\n            this.breakpoint = null;\n          } else {\n            this.breakpoint = matchedConfig.breakpoint;\n          }\n          if (matchedConfig.disable) {\n            this.destroyCarousel();\n            return;\n          }\n          this.options = {\n            ...matchedConfig,\n            slidesPerView: matchedConfig.slidesPerView || 1\n          };\n          if (this.destroy && !matchedConfig.disable) {\n            this.destroy = null;\n            this.init();\n          }\n        }\n      };\n      window.addEventListener(\"resize\", updateCarousel);\n      updateCarousel();\n    };\n    checkResponsive();\n    !this.destroy && this.init();\n  }\n  init() {\n    this.setupCarousel();\n    this.setupNavigation();\n    this.counter && this.setupCounter();\n    this.setupAutoplay();\n    this.setupTouchEvents();\n    this.options.pagination && this.setupPagination();\n  }\n  stopAutoplayOnResize() {\n    this.destroyAutoplay();\n    clearTimeout(this.resizeTimeout);\n    this.resizeTimeout = setTimeout(() => {\n      if (!this.destroy && this.options.autoplay && this.options.autoplay.delay) this.startAutoplay();\n    }, 300);\n  }\n  destroyPagination() {\n    const paginationContainer = document.querySelector(this.options.pagination);\n    paginationContainer.innerHTML = \"\";\n  }\n  setupPagination() {\n    const paginationContainer = document.querySelector(this.options.pagination);\n    paginationContainer.classList.add(\"carousel-pagination\");\n    for (let i = 0; i < this.slides.length; i++) {\n      const bullet = document.createElement(\"div\");\n      bullet.classList.add(\"carousel-bullet\");\n      paginationContainer.appendChild(bullet);\n    }\n    document.querySelector(\".carousel-bullet\").classList.add(\"active\");\n  }\n  destroyAutoplay() {\n    this.stopAutoplay();\n  }\n  setupAutoplay() {\n    if (this.options.autoplay && this.options.autoplay.delay) {\n      this.setupVisibilityListener();\n      this.startAutoplay();\n      this.wrapper.addEventListener(\"mouseenter\", () => {\n        clearInterval(this.autoplayInterval);\n      });\n      this.wrapper.addEventListener(\"mouseleave\", () => {\n        this.startAutoplay();\n      });\n      this.boundStopAutoplayOnResize = this.stopAutoplayOnResize.bind(this);\n      window.addEventListener(\"resize\", this.boundStopAutoplayOnResize);\n    }\n  }\n  setupVisibilityListener() {\n    document.addEventListener(\"visibilitychange\", () => {\n      if (document.hidden) {\n        this.stopAutoplay();\n      } else if (this.options.autoplay) {\n        this.startAutoplay();\n      }\n    });\n  }\n  startAutoplay() {\n    this.autoplayInterval = setInterval(() => {\n      this.nextSlide();\n    }, this.options.autoplay.delay);\n  }\n  stopAutoplay() {\n    if (this.autoplayInterval) {\n      clearInterval(this.autoplayInterval);\n      this.autoplayInterval = null;\n    }\n  }\n  destroyCounter() {\n    const current = document.querySelector(this.counter.current);\n    const total = document.querySelector(this.counter.total);\n    current.textContent = \"\";\n    total.textContent = \"\";\n  }\n  setupCounter() {\n    const current = document.querySelector(this.counter.current);\n    const total = document.querySelector(this.counter.total);\n    current.textContent = \"1\";\n    total.textContent = this.slides.length;\n  }\n  changeCurrentCounterSlide() {\n    const index = Array.from(this.slides).findIndex(slide => slide.classList.contains(\"slide-first\"));\n    const current = document.querySelector(this.counter.current);\n    current.textContent = index + 1;\n  }\n  changeCurrentPaginationBullet() {\n    const index = Array.from(this.slides).findIndex(slide => slide.classList.contains(\"slide-first\"));\n    const pagination = document.querySelector(this.options.pagination);\n    const bullets = pagination.querySelectorAll(\".carousel-bullet\");\n    bullets.forEach(bullet => {\n      bullet.classList.remove(\"active\");\n    });\n    bullets[index].classList.add(\"active\");\n  }\n  destroyTouchEvents() {\n    this.wrapper.removeEventListener(\"touchstart\", this.handleTouchStart);\n    this.wrapper.removeEventListener(\"touchmove\", this.handleTouchMove);\n    this.wrapper.removeEventListener(\"touchend\", this.handleTouchEnd);\n  }\n  setupTouchEvents() {\n    let startX = 0;\n    let currentX = 0;\n    let isDragging = false;\n    this.handleTouchStart = e => {\n      startX = e.touches[0].clientX;\n      isDragging = true;\n    };\n    this.handleTouchMove = e => {\n      if (!isDragging) return;\n      currentX = e.touches[0].clientX - startX;\n    };\n    this.handleTouchEnd = () => {\n      if (!isDragging) return;\n      isDragging = false;\n      if (currentX > 50) {\n        this.prevSlide();\n      } else if (currentX < -50) {\n        this.nextSlide();\n      }\n    };\n    this.wrapper.addEventListener(\"touchstart\", this.handleTouchStart);\n    this.wrapper.addEventListener(\"touchmove\", this.handleTouchMove);\n    this.wrapper.addEventListener(\"touchend\", this.handleTouchEnd);\n  }\n  prevSlide() {\n    if (!this.destroy) {\n      this.stopAutoplay();\n      const slides = this.wrapper.querySelectorAll(\".carousel-slide\");\n      const offset = this.slideWidth;\n      const style = window.getComputedStyle(this.wrapper);\n      let matrix = new WebKitCSSMatrix(style.transform);\n      const firstSlide = this.wrapper.querySelector(\".slide-first\");\n      const firstSlidePrevSibling = firstSlide.previousElementSibling;\n      if (firstSlidePrevSibling) {\n        this.wrapper.style.transform = `translateX(${matrix.m41 + offset}px)`;\n      } else {\n        const lastSlide = slides[slides.length - 1];\n        const parent = slides[0].parentNode;\n        parent.insertBefore(lastSlide, parent.firstChild);\n        parent.style.transitionDuration = \"0s\";\n        this.wrapper.style.transform = `translateX(${matrix.m41 - offset}px)`;\n        matrix = new WebKitCSSMatrix(style.transform);\n        setTimeout(() => {\n          parent.style.transitionDuration = null;\n          this.wrapper.style.transform = `translateX(${matrix.m41 + offset}px)`;\n        }, 50);\n      }\n      this.updateActiveSlides(\"prev\");\n      if (this.options.autoplay && this.options.autoplay.delay) {\n        this.startAutoplay();\n      }\n    }\n  }\n  nextSlide() {\n    if (!this.destroy) {\n      this.stopAutoplay();\n      const slides = this.wrapper.querySelectorAll(\".carousel-slide\");\n      const offset = this.slideWidth;\n      const style = window.getComputedStyle(this.wrapper);\n      let matrix = new WebKitCSSMatrix(style.transform);\n      const lastSlide = this.wrapper.querySelector(\".slide-last\");\n      const lastSlideNextSibling = lastSlide.nextElementSibling;\n      if (lastSlideNextSibling) {\n        this.wrapper.style.transform = `translateX(${matrix.m41 - offset}px)`;\n      } else {\n        const firstSlide = slides[0];\n        const parent = slides[0].parentNode;\n        parent.appendChild(firstSlide);\n        parent.style.transitionDuration = \"0s\";\n        this.wrapper.style.transform = `translateX(${matrix.m41 + offset}px)`;\n        matrix = new WebKitCSSMatrix(style.transform);\n        setTimeout(() => {\n          parent.style.transitionDuration = null;\n          this.wrapper.style.transform = `translateX(${matrix.m41 - offset}px)`;\n        }, 50);\n      }\n      this.updateActiveSlides(\"next\");\n      if (this.options.autoplay && this.options.autoplay.delay) {\n        this.startAutoplay();\n      }\n    }\n  }\n  destroyNavigation() {\n    const prevButton = document.querySelector(navigation.prev);\n    const nextButton = document.querySelector(navigation.next);\n    prevButton?.removeEventListener(\"click\", () => this.prevSlide());\n    nextButton?.removeEventListener(\"click\", () => this.nextSlide());\n  }\n  setupNavigation() {\n    const navigation = this.options.navigation;\n    if (navigation && navigation.prev && navigation.next) {\n      const prevButton = document.querySelector(navigation.prev);\n      const nextButton = document.querySelector(navigation.next);\n      prevButton.addEventListener(\"click\", () => this.prevSlide());\n      nextButton.addEventListener(\"click\", () => this.nextSlide());\n    }\n  }\n  destroyCarousel() {\n    this.destroy = true;\n    if (this.wrapper) {\n      this.wrapper.remove();\n      this.wrapper = null;\n      this.slides.forEach(slide => {\n        slide.classList.remove(\"slide-first\", \"slide-last\");\n        slide.removeAttribute(\"style\");\n        this.container.appendChild(slide);\n      });\n      if (this.options.pagination) {\n        this.destroyPagination();\n      }\n      if (this.options.autoplay) {\n        this.destroyAutoplay();\n      }\n      if (this.counter?.current && this.counter?.total) {\n        this.destroyCounter();\n      }\n      if (this.options.navigation && this.options.navigation?.prev && this.options.navigation?.next) {\n        this.destroyNavigation();\n      }\n      window.removeEventListener(\"resize\", this.boundSetupSlidesWidth);\n      window.removeEventListener(\"resize\", this.boundStopAutoplayOnResize);\n    }\n  }\n  setupCarousel() {\n    const container = this.container;\n    const slides = this.slides;\n    const slidesPerView = this.options.slidesPerView;\n    container.classList.add(\"carousel\");\n    const carouselWrapper = document.createElement(\"div\");\n    carouselWrapper.classList.add(\"carousel-wrapper\");\n    carouselWrapper.style.transform = \"translateX(0)\";\n    this.wrapper = carouselWrapper;\n    this.slides.forEach(slide => {\n      carouselWrapper.appendChild(slide);\n    });\n    container.appendChild(carouselWrapper);\n    slides[0].classList.add(\"slide-first\");\n    slides[slidesPerView - 1].classList.add(\"slide-last\");\n    this.boundSetupSlidesWidth = this.setupSlidesWidth.bind(this);\n    window.addEventListener(\"resize\", this.boundSetupSlidesWidth);\n    this.boundSetupSlidesWidth();\n  }\n  setupSlidesWidth() {\n    const container = this.container;\n    const wrapper = this.wrapper;\n    this.slides?.forEach(item => {\n      item.style.width = container.offsetWidth / this.options.slidesPerView + \"px\";\n      this.slideWidth = container.offsetWidth / this.options.slidesPerView;\n    });\n    this.wrapper.style.transform = `translateX(0px)`;\n    if (this.counter && this.counter.current && this.counter.total) {\n      document.querySelector(this.counter.current).textContent = \"1\";\n    }\n    this.slides.forEach(slide => {\n      slide.classList.remove(\"slide-first\", \"slide-last\");\n    });\n    this.slides[0].classList.add(\"slide-first\");\n    this.slides[this.options.slidesPerView - 1].classList.add(\"slide-last\");\n  }\n  updateActiveSlides(direction = \"next\") {\n    const wrapper = this.wrapper;\n    const firstSlide = wrapper.querySelector(\".slide-first\");\n    const lastSlide = wrapper.querySelector(\".slide-last\");\n    if (direction === \"next\") {\n      firstSlide.classList.remove(\"slide-first\");\n      firstSlide.nextElementSibling?.classList.add(\"slide-first\");\n      lastSlide.classList.remove(\"slide-last\");\n      lastSlide.nextElementSibling?.classList.add(\"slide-last\");\n    } else {\n      firstSlide.classList.remove(\"slide-first\");\n      firstSlide.previousElementSibling?.classList.add(\"slide-first\");\n      lastSlide.classList.remove(\"slide-last\");\n      lastSlide.previousElementSibling?.classList.add(\"slide-last\");\n    }\n    if (this.options.counter && this.options.counter?.current && this.options.counter?.total) {\n      this.changeCurrentCounterSlide();\n    }\n    if (this.options.pagination) {\n      this.changeCurrentPaginationBullet();\n    }\n  }\n}\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/carousel.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _running_line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./running-line */ \"./src/scripts/running-line.js\");\n/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stages */ \"./src/scripts/stages.js\");\n/* harmony import */ var _participants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./participants */ \"./src/scripts/participants.js\");\n/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about */ \"./src/scripts/about.js\");\n/* harmony import */ var _anchors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./anchors */ \"./src/scripts/anchors.js\");\n\n\n\n\n\n// import { Carousel } from \"./carousel\";\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // Carousel;\n  (0,_running_line__WEBPACK_IMPORTED_MODULE_0__.runningLine)();\n  (0,_stages__WEBPACK_IMPORTED_MODULE_1__.stages)();\n  (0,_participants__WEBPACK_IMPORTED_MODULE_2__.participants)();\n  (0,_about__WEBPACK_IMPORTED_MODULE_3__.about)();\n  (0,_anchors__WEBPACK_IMPORTED_MODULE_4__.anchors)();\n});\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/participants.js":
/*!*************************************!*\
  !*** ./src/scripts/participants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   participants: () => (/* binding */ participants)\n/* harmony export */ });\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ \"./src/scripts/carousel.js\");\n\nconst participants = () => {\n  new _carousel__WEBPACK_IMPORTED_MODULE_0__.Carousel(\".participants__slider__wrapper\", {\n    slidesPerView: 3,\n    autoplay: {\n      delay: 5000\n    },\n    navigation: {\n      prev: \".participants__slider__nav .prev\",\n      next: \".participants__slider__nav .next\"\n    },\n    counter: {\n      current: \".participants__slider__nav__counter__current\",\n      total: \".participants__slider__nav__counter__total\"\n    },\n    responsive: [{\n      breakpoint: 1023,\n      slidesPerView: 1,\n      autoplay: {\n        delay: 5000\n      },\n      navigation: {\n        prev: \".participants__slider__nav .prev\",\n        next: \".participants__slider__nav .next\"\n      },\n      counter: {\n        current: \".participants__slider__nav__counter__current\",\n        total: \".participants__slider__nav__counter__total\"\n      }\n    }]\n  });\n};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/participants.js?");

/***/ }),

/***/ "./src/scripts/running-line.js":
/*!*************************************!*\
  !*** ./src/scripts/running-line.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   runningLine: () => (/* binding */ runningLine)\n/* harmony export */ });\nconst initAnimation = item => {\n  const clone = item.innerHTML;\n  item.innerHTML += clone;\n  let offset = 0;\n  function animate() {\n    offset -= 1;\n    if (Math.abs(offset) >= item.offsetWidth / 2) {\n      offset = 0;\n    }\n    item.style.transform = `translateX(${offset}px)`;\n    requestAnimationFrame(animate);\n  }\n  animate();\n};\nconst runningLine = () => {\n  const runningLine = document.querySelectorAll(\".running-line__text\");\n  runningLine.forEach(item => {\n    initAnimation(item);\n  });\n};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/running-line.js?");

/***/ }),

/***/ "./src/scripts/stages.js":
/*!*******************************!*\
  !*** ./src/scripts/stages.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   stages: () => (/* binding */ stages)\n/* harmony export */ });\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ \"./src/scripts/carousel.js\");\n\nconst stages = () => {\n  new _carousel__WEBPACK_IMPORTED_MODULE_0__.Carousel(\".stages__slider__container\", {\n    disable: true,\n    responsive: [{\n      disable: false,\n      breakpoint: 1023,\n      slidesPerView: 1,\n      navigation: {\n        prev: \".stages__slider__nav .prev\",\n        next: \".stages__slider__nav .next\"\n      },\n      pagination: \".stages__slider__nav__pagination\"\n    }]\n  });\n};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/stages.js?");

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/sass/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;