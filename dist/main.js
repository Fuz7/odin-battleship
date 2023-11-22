/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script/DOM/settings.js":
/*!************************************!*\
  !*** ./src/script/DOM/settings.js ***!
  \************************************/
/***/ (() => {

function toggleButton() {
  if (this.classList.contains("".concat(this.id, "--on"))) {
    this.classList.remove("".concat(this.id, "--on"));
    this.classList.add("".concat(this.id, "--off"));
  } else if (this.classList.contains("".concat(this.id, "--off"))) {
    this.classList.remove("".concat(this.id, "--off"));
    this.classList.add("".concat(this.id, "--on"));
  }
}
(function renderSoundButtons() {
  var sfxButton = document.getElementById('sfxButton');
  var musicButton = document.getElementById('musicButton');
  sfxButton.addEventListener('click', toggleButton);
  musicButton.addEventListener('click', toggleButton);
})();
(function renderSettingButton() {
  var name = 'settingsContainer';
  var settingsButton = document.getElementById('settingsButton');
  var settingsContainer = document.getElementById(name);
  settingsButton.addEventListener('click', function () {
    if (settingsContainer.classList.contains(name)) {
      settingsContainer.classList.remove(name);
      settingsContainer.classList.add("".concat(name, "--visible"));
    } else {
      settingsContainer.classList.remove("".concat(name, "--visible"));
      settingsContainer.classList.add(name);
    }
  });
})();
(function renderSettingCloseButton() {
  var closeButton = document.getElementById('settingsPage__closeButton');
  var settingsContainer = document.getElementById('settingsContainer');
  closeButton.addEventListener('click', function () {
    settingsContainer.classList.remove('settingsContainer--visible');
    settingsContainer.classList.add('settingsContainer');
  });
})();

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/images/logo.png":
/*!************************************!*\
  !*** ./src/assets/images/logo.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/images/logo.png";

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./src/script/main.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/images/logo.png */ "./src/assets/images/logo.png");
/* harmony import */ var _DOM_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM/settings */ "./src/script/DOM/settings.js");
/* harmony import */ var _DOM_settings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_DOM_settings__WEBPACK_IMPORTED_MODULE_2__);



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCMkI7QUFDUSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHQvRE9NL3NldHRpbmdzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zYXNzL21haW4uc2NzcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHQvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB0b2dnbGVCdXR0b24oKSB7XG4gIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucyhgJHt0aGlzLmlkfS0tb25gKSkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShgJHt0aGlzLmlkfS0tb25gKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy5pZH0tLW9mZmApO1xuICB9IGVsc2UgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGAke3RoaXMuaWR9LS1vZmZgKSkge1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShgJHt0aGlzLmlkfS0tb2ZmYCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKGAke3RoaXMuaWR9LS1vbmApO1xuICB9XG59XG5cbihmdW5jdGlvbiByZW5kZXJTb3VuZEJ1dHRvbnMoKSB7XG4gIGNvbnN0IHNmeEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZnhCdXR0b24nKTtcbiAgY29uc3QgbXVzaWNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWNCdXR0b24nKTtcbiAgc2Z4QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQnV0dG9uKTtcbiAgbXVzaWNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVCdXR0b24pO1xufSkoKTtcblxuXG4oZnVuY3Rpb24gcmVuZGVyU2V0dGluZ0J1dHRvbigpe1xuICBjb25zdCBuYW1lID0gJ3NldHRpbmdzQ29udGFpbmVyJ1xuICBjb25zdCBzZXR0aW5nc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5nc0J1dHRvbicpXG4gIGNvbnN0IHNldHRpbmdzQ29udGFpbmVyID1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKVxuXG4gIHNldHRpbmdzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGlmKHNldHRpbmdzQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSl7XG4gICAgICBzZXR0aW5nc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpXG4gICAgICBzZXR0aW5nc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGAke25hbWV9LS12aXNpYmxlYClcbiAgICB9ZWxzZXtcbiAgICAgIHNldHRpbmdzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7bmFtZX0tLXZpc2libGVgKVxuICAgICAgc2V0dGluZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChuYW1lKVxuICBcbiAgICB9XG4gIH0pXG59KSgpO1xuXG4oZnVuY3Rpb24gcmVuZGVyU2V0dGluZ0Nsb3NlQnV0dG9uKCl7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzUGFnZV9fY2xvc2VCdXR0b24nKTtcbiAgY29uc3Qgc2V0dGluZ3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBzZXR0aW5nc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzZXR0aW5nc0NvbnRhaW5lci0tdmlzaWJsZScpXG4gICAgc2V0dGluZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKVxuICB9KVxufSkoKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4uL3Nhc3MvbWFpbi5zY3NzJztcbmltcG9ydCAnLi4vYXNzZXRzL2ltYWdlcy9sb2dvLnBuZyc7XG5pbXBvcnQgJy4vRE9NL3NldHRpbmdzJ1xuIl0sIm5hbWVzIjpbInRvZ2dsZUJ1dHRvbiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY29uY2F0IiwiaWQiLCJyZW1vdmUiLCJhZGQiLCJyZW5kZXJTb3VuZEJ1dHRvbnMiLCJzZnhCdXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibXVzaWNCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwicmVuZGVyU2V0dGluZ0J1dHRvbiIsIm5hbWUiLCJzZXR0aW5nc0J1dHRvbiIsInNldHRpbmdzQ29udGFpbmVyIiwicmVuZGVyU2V0dGluZ0Nsb3NlQnV0dG9uIiwiY2xvc2VCdXR0b24iXSwic291cmNlUm9vdCI6IiJ9