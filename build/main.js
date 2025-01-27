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

/***/ "./src/scripts/carousel.js":
/*!*********************************!*\
  !*** ./src/scripts/carousel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Carousel: () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\n  constructor(container, options) {\n    this.container = document.querySelector(container);\n    this.wrapper = null;\n    this.slides = this.container.querySelectorAll(\".carousel-slide\");\n    this.totalSlides = this.slides.length;\n    this.activeSlideCount = 1;\n    this.options = {\n      ...options,\n      slidesPerView: options.slidesPerView || 1\n    };\n    this.slideWidth = 0;\n    this.init();\n  }\n  init() {\n    this.setupCarousel();\n    this.setupNavigation();\n  }\n  prevSlide() {\n    const offset = this.slideWidth * this.options.slidesPerView;\n    const count = this.activeSlideCount;\n    const style = window.getComputedStyle(this.wrapper);\n    const matrix = new WebKitCSSMatrix(style.transform);\n    if (this.activeSlideCount > 1) {\n      this.activeSlideCount = count - 1;\n      this.wrapper.style.transform = `translateX(${matrix.m41 + offset}px)`;\n    }\n  }\n  nextSlide() {\n    const offset = this.slideWidth * this.options.slidesPerView;\n    const count = this.activeSlideCount;\n    const maxCount = this.totalSlides / this.options.slidesPerView;\n    const style = window.getComputedStyle(this.wrapper);\n    const matrix = new WebKitCSSMatrix(style.transform);\n    if (this.activeSlideCount < maxCount) {\n      this.activeSlideCount = count + 1;\n      this.wrapper.style.transform = `translateX(${matrix.m41 - offset}px)`;\n    }\n  }\n  setupNavigation() {\n    const navigation = this.options.navigation;\n    if (navigation && navigation.prev && navigation.next) {\n      const prevButton = document.querySelector(navigation.prev);\n      const nextButton = document.querySelector(navigation.next);\n      prevButton.addEventListener(\"click\", () => this.prevSlide());\n      nextButton.addEventListener(\"click\", () => this.nextSlide());\n    }\n  }\n  setupCarousel() {\n    const container = this.container;\n    container.classList.add(\"carousel\");\n    const carouselWrapper = document.createElement(\"div\");\n    carouselWrapper.classList.add(\"carousel-wrapper\");\n    carouselWrapper.style.transform = \"translateX(0)\";\n    this.wrapper = carouselWrapper;\n    this.slides.forEach(slide => {\n      carouselWrapper.appendChild(slide);\n    });\n    container.appendChild(carouselWrapper);\n    this.setupSlidesWidth();\n  }\n  setupSlidesWidth() {\n    const container = this.container;\n    this.slides.forEach(item => {\n      item.style.width = container.offsetWidth / this.options.slidesPerView + \"px\";\n      this.slideWidth = container.offsetWidth / this.options.slidesPerView;\n    });\n\n    // this.activeSlideCount = this.totalSlides / this.options.slidesPerView;\n  }\n}\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/carousel.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _running_line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./running-line */ \"./src/scripts/running-line.js\");\n/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stages */ \"./src/scripts/stages.js\");\n/* harmony import */ var _participants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./participants */ \"./src/scripts/participants.js\");\n\n\n\n// import { Carousel } from \"./carousel\";\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // Carousel;\n  (0,_running_line__WEBPACK_IMPORTED_MODULE_0__.runningLine)();\n  (0,_stages__WEBPACK_IMPORTED_MODULE_1__.stages)();\n  (0,_participants__WEBPACK_IMPORTED_MODULE_2__.participants)();\n});\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/participants.js":
/*!*************************************!*\
  !*** ./src/scripts/participants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   participants: () => (/* binding */ participants)\n/* harmony export */ });\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ \"./src/scripts/carousel.js\");\n\nconst participants = () => {\n  new _carousel__WEBPACK_IMPORTED_MODULE_0__.Carousel(\".participants__slider__wrapper\", {\n    slidesPerView: 3,\n    autoPlay: true,\n    autoPlaySpeed: 2000,\n    navigation: {\n      prev: \".participants__slider__nav .prev\",\n      next: \".participants__slider__nav .next\"\n    },\n    responsive: [{\n      breakpoint: 1024,\n      slidesToShow: 2\n    }, {\n      breakpoint: 768,\n      slidesToShow: 1\n    }]\n  });\n};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/participants.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   stages: () => (/* binding */ stages)\n/* harmony export */ });\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ \"./src/scripts/carousel.js\");\n\nconst stages = () => {};\n\n//# sourceURL=webpack://yandex-crowd-landing/./src/scripts/stages.js?");

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