/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PureRwdImageMaps"] = factory();
	else
		root["PureRwdImageMaps"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/pureRwdImageMaps.ts":
/*!************************************!*\
  !*** ./src/ts/pureRwdImageMaps.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar PureRwdImageMaps = /** @class */ (function () {\n    function PureRwdImageMaps(targetImg, userOptions) {\n        if (userOptions === void 0) { userOptions = {}; }\n        this.loaded = false;\n        this.targetImgNaturalHeight = 0;\n        this.targetImgNaturalWidth = 0;\n        this.targetAreasNaturalCoords = [];\n        this.resizeObserver = null;\n        this.targetImg = targetImg;\n        var options = Object.assign({\n            autoRwd: true,\n            vertical: true,\n            horizontal: true,\n        }, userOptions);\n        this.autoRwd = options.autoRwd;\n        this.vertical = options.vertical;\n        this.horizontal = options.horizontal;\n        var name = targetImg.getAttribute('usemap');\n        if (!name) {\n            throw new Error('target image do not have \"usemap\" attribute.');\n        }\n        this.name = name.replace('#', '');\n        var targetMap = document.querySelector(\"map[name=\" + this.name + \"]\");\n        if (!targetMap) {\n            throw new Error('do not exist \"map element\".');\n        }\n        this.targetMap = targetMap;\n        var targetAreas = targetMap.querySelectorAll('area');\n        if (targetAreas.length <= 0) {\n            throw new Error('do not exist \"area element\".');\n        }\n        this.targetAreas = targetAreas;\n        targetImg.addEventListener('load', this.init.bind(this));\n    }\n    PureRwdImageMaps.prototype.init = function () {\n        this.targetImgNaturalWidth = this.targetImg.naturalWidth;\n        this.targetImgNaturalHeight = this.targetImg.naturalHeight;\n        this.targetAreasNaturalCoords = Array.from(this.targetAreas).map(function (area) { return area.coords; });\n        this.resizeObserver = new ResizeObserver(this.computeCoords.bind(this));\n        this.loaded = true;\n        if (this.autoRwd) {\n            this.toRwd();\n        }\n    };\n    PureRwdImageMaps.prototype.computeCoords = function () {\n        var targetImageWidth = this.targetImg.offsetWidth;\n        var targetImageHeight = this.targetImg.offsetHeight;\n        var percentWidth = targetImageWidth / this.targetImgNaturalWidth;\n        var percentHeight = targetImageHeight / this.targetImgNaturalHeight;\n        for (var i = this.targetAreas.length; i--;) {\n            var coords = this.targetAreasNaturalCoords[i].split(',');\n            var computedCoords = [];\n            for (var j = coords.length; j--;) {\n                var coord = Number(coords[j]);\n                if (j % 2 === 0 && this.horizontal) {\n                    computedCoords[j] = coord * percentWidth;\n                }\n                else if (j % 2 !== 0 && this.vertical) {\n                    computedCoords[j] = coord * percentHeight;\n                }\n                else {\n                    computedCoords[j] = coord;\n                }\n            }\n            this.targetAreas[i].coords = computedCoords.join(',');\n        }\n    };\n    PureRwdImageMaps.prototype.resetCoords = function () {\n        for (var i = this.targetAreas.length; i--;) {\n            this.targetAreas[i].coords = this.targetAreasNaturalCoords[i];\n        }\n    };\n    PureRwdImageMaps.prototype.toRwd = function () {\n        if (!this.loaded || !this.resizeObserver) {\n            throw new Error('do not finished initialization.');\n        }\n        this.resizeObserver.observe(this.targetImg);\n        this.computeCoords();\n    };\n    PureRwdImageMaps.prototype.toStatic = function () {\n        if (!this.loaded || !this.resizeObserver) {\n            throw new Error('do not finished initialization.');\n        }\n        this.resizeObserver.disconnect();\n        this.resetCoords();\n    };\n    return PureRwdImageMaps;\n}());\nexports.default = PureRwdImageMaps;\n\n\n//# sourceURL=webpack://PureRwdImageMaps/./src/ts/pureRwdImageMaps.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ts/pureRwdImageMaps.ts"](0, __webpack_exports__);
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});