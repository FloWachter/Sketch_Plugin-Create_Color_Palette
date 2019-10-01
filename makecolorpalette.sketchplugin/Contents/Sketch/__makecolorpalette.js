var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/makecolorpalette.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/makecolorpalette.js":
/*!*********************************!*\
  !*** ./src/makecolorpalette.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = doc.selectedLayers;
  var selectedCount = selectedLayers.length;
  var page = doc.selectedPage; // Check if something is selected

  if (selectedCount === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('No layers are selected.');
  } else {
    // Function which checks if it is hex value
    var isHex = function isHex(val) {
      var re = /[0-9A-Fa-f]{6}/g;

      if (re.test(val)) {
        return true;
      } else {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('Process Canceled, no Hex Value!');
        return false;
      }

      re.lastIndex = 0;
    }; // Check if the input is a hex value


    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(selectedCount + ' layers selected.'); // find the background color of the selected items

    var colorData = [];
    selectedLayers.forEach(function (layer) {
      var data = layer.style.fills;
      var color = data.map(function (c) {
        return c.color;
      });

      if (color != undefined) {
        colorData.push(color);
      }
    }); // Input Form for Picking the overlay color

    var overlayColor = "";
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.getInputFromUser("Choose a overlay color to match the colors to eachother! \n (format: #xxxxxx)", {
      initialValue: '#FFEA26'
    }, function (err, value) {
      if (err) {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message('Process Canceled!');
        return;
      }

      overlayColor = value;
    });

    if (isHex(overlayColor) == true) {
      // Create a new artboard where the pallet will be placed
      var Artboard = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Artboard;
      var myArtboard = new Artboard({
        parent: page,
        flowStartPoint: true,
        frame: {
          x: 0,
          y: 0,
          width: 90 * colorData.length,
          height: 90
        },
        name: "Color Palette"
      }); // Create rectagles with the selected colors

      var ShapePath = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.ShapePath;

      for (var i = 0; i < colorData.length; i++) {
        // clean up the hex value from the background color of the selected items
        var colorUse = colorData[i][0].slice(0, 7); // create rects in the new artboard with the selected colors

        var mySquare = new ShapePath({
          parent: myArtboard,
          frame: {
            x: 90 * i,
            y: 0,
            width: 90,
            height: 90
          },
          style: {
            fills: [colorUse],
            borders: []
          },
          name: "Selected_base_color"
        });
      } // create a white layer on top of the colors


      var rectWhite_top = new ShapePath({
        parent: myArtboard,
        frame: {
          x: 0,
          y: 0,
          width: 90 * colorData.length,
          height: 30
        },
        style: {
          fills: ['#ffffff'],
          opacity: 0.2,
          borders: []
        },
        name: "White_opayity_rect_top"
      }); // create a black layer on top of the colors

      var rectblack_bottom = new ShapePath({
        parent: myArtboard,
        frame: {
          x: 0,
          y: 60,
          width: 90 * colorData.length,
          height: 30
        },
        style: {
          fills: ['#000000'],
          opacity: 0.2,
          borders: []
        },
        name: "Black_opayity_rect_bottom"
      }); // create two layer of overlayer blending colors in the middle and at the end of each color

      for (var i = 0; i < colorData.length; i++) {
        for (var z = 1; z < 3; z++) {
          var _rectblack_bottom = new ShapePath({
            parent: myArtboard,
            frame: {
              x: 90 * i + 30 * z,
              y: 0,
              width: 30,
              height: 90
            },
            style: {
              fills: [overlayColor],
              opacity: 0.4 * z,
              borders: [],
              blendingMode: 'Overlay'
            },
            name: "Overlay_blending_color"
          });
        }
      }
    }
  }
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__makecolorpalette.js.map