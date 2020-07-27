var that = this;
function __skpm_run (key, context) {
  that.context = context;

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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/modify-multiple-elements.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./src/modify-multiple-elements.js":
/*!*****************************************!*\
  !*** ./src/modify-multiple-elements.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var UpdateMultipleElements = /*#__PURE__*/function () {
  function UpdateMultipleElements(context, properties) {
    var _this = this;

    _classCallCheck(this, UpdateMultipleElements);

    this.context = context;
    this.selector = properties.selector; //|| sketch.UI.getStringFromUser("What is the ID elements?");

    this.type = properties.type; // || sketch.UI.getStringFromUser("What PROPERTY would you like to change?");

    this.value = properties.value; // || sketch.UI.getStringFromUser("What's the new VALUE?");

    this.modifiedLayers = 0;

    if (this.selector && this.selector !== 'null' && this.type && this.type !== 'null' && this.value && this.value !== 'null') {
      this.updatePages().then(function () {
        return _this.resizeToFitChildren().then(function () {
          return _this.sendSuccessMessage();
        });
      });
    } else {
      this.sendErrorMessage();
    }
  }

  _createClass(UpdateMultipleElements, [{
    key: "sendSuccessMessage",
    value: function sendSuccessMessage() {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("We set " + this.type + " to " + this.value + "px on " + this.modifiedLayers + " " + (this.modifiedLayers.length > 1 ? "elements" : "element") + " 🙌");
    }
  }, {
    key: "sendErrorMessage",
    value: function sendErrorMessage() {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Nothing changed, please update your query...");
    }
  }, {
    key: "resizeToFitChildren",
    value: function resizeToFitChildren() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.context.document.pages().forEach(function (page) {
          if (page.resizeToFitChildrenWithOption) {
            page.resizeToFitChildrenWithOption(0);
            page.resizeToFitChildrenWithOption(1);
          }

          page.children().forEach(function (layer) {
            if (layer.resizeToFitChildrenWithOption) {
              layer.resizeToFitChildrenWithOption(0);
              layer.resizeToFitChildrenWithOption(1);
            }

            resolve();
          });
        });
      });
    }
  }, {
    key: "updateLayers",
    value: function updateLayers(layers) {
      var _this3 = this;

      return new Promise(function (resolve) {
        layers.forEach(function (layer, index) {
          if (layer.name().includes(_this3.selector)) {
            layer.absoluteRect()[_this3.type] = _this3.value;
            _this3.modifiedLayers++;
          }

          if (layers.length === index + 1) resolve();
        });
      });
    }
  }, {
    key: "updatePages",
    value: function updatePages() {
      var _this4 = this;

      return new Promise(function (resolve) {
        var pages = _this4.context.document.pages();

        pages.forEach(function (page, index) {
          var layers = page.children();

          _this4.updateLayers(layers).then(function () {
            if (pages.length === index + 1) resolve();
          });
        });
      });
    }
  }]);

  return UpdateMultipleElements;
}();

var mmToPx = function mmToPx(mm) {
  return Math.floor(mm * 3.7795275591);
};

var frameCanvas = function frameCanvas() {
  //depth
  var relief = {
    width: mmToPx(4),
    height: mmToPx(4)
  }; //frame thickness

  var frame = {
    width: mmToPx(10),
    height: mmToPx(10)
  };
  var aperture = {
    width: mmToPx(261),
    height: mmToPx(194)
  };
  var px = 2 * frame.width + relief.width;
  var py = 2 * frame.height + relief.height;
  var totalWidth = aperture.width + px;
  var totalHeight = aperture.height + py;
  var scaledWidth = aperture.width / totalWidth;
  var scaledHeight = aperture.height / totalHeight;
  var translateWidth = px * scaledWidth;
  var translateHeight = py * scaledHeight; //frame size

  var content = {
    width: aperture.width,
    height: aperture.height
  };
  var data = []; // how to push data in svg from sketch point of view ?

  data.push({
    selector: 'Effects',
    type: 'scaledWidth',
    value: scaledWidth
  });
  data.push({
    selector: 'Effects',
    type: 'scaledHeight',
    value: scaledHeight
  });
  data.push({
    selector: 'Effects',
    type: 'translateWidth',
    value: translateWidth
  });
  data.push({
    selector: 'Effects',
    type: 'translateHeight',
    value: translateHeight
  });
  /**
   * Relief
   */
  // cadre interne taille

  data.push({
    selector: 'innerFrame_0',
    type: 'width',
    value: content.width
  });
  data.push({
    selector: 'innerFrame_0',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'innerFrame_2',
    type: 'width',
    value: content.width
  });
  data.push({
    selector: 'innerFrame_2',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'innerFrame_1',
    type: 'height',
    value: content.height
  });
  data.push({
    selector: 'innerFrame_1',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'innerFrame_3',
    type: 'height',
    value: content.height
  });
  data.push({
    selector: 'innerFrame_3',
    type: 'width',
    value: frame.width
  }); //cadre interne position

  data.push({
    selector: 'innerFrame_0',
    type: 'x',
    value: frame.width
  });
  data.push({
    selector: 'innerFrame_0',
    type: 'y',
    value: relief.height + frame.height + content.height
  });
  data.push({
    selector: 'innerFrame_1',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'innerFrame_1',
    type: 'y',
    value: relief.height + frame.height
  });
  data.push({
    selector: 'innerFrame_2',
    type: 'x',
    value: frame.width
  });
  data.push({
    selector: 'innerFrame_2',
    type: 'y',
    value: relief.height
  });
  data.push({
    selector: 'innerFrame_3',
    type: 'x',
    value: content.width + frame.width
  });
  data.push({
    selector: 'innerFrame_3',
    type: 'y',
    value: relief.height + frame.height
  }); // corner size :

  data.push({
    selector: 'corner_0',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_0',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'corner_1',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_1',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'corner_2',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_2',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'corner_3',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_3',
    type: 'height',
    value: frame.height
  }); // corner position :

  data.push({
    selector: 'corner_0',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'corner_0',
    type: 'y',
    value: relief.height + frame.height + content.height
  });
  data.push({
    selector: 'corner_1',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'corner_1',
    type: 'y',
    value: relief.height
  });
  data.push({
    selector: 'corner_2',
    type: 'x',
    value: frame.width + content.width
  });
  data.push({
    selector: 'corner_2',
    type: 'y',
    value: relief.height
  });
  data.push({
    selector: 'corner_3',
    type: 'x',
    value: frame.width + content.width
  });
  data.push({
    selector: 'corner_3',
    type: 'y',
    value: relief.height + frame.height + content.height
  }); //triangle size

  data.push({
    selector: 'tri_0',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_0',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'tri_1',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_1',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'tri_2',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_2',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'tri_3',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_3',
    type: 'height',
    value: relief.height
  }); //triangle position

  data.push({
    selector: 'tri_0',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'tri_0',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'tri_1',
    type: 'x',
    value: content.width + 2 * frame.width
  });
  data.push({
    selector: 'tri_1',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'tri_2',
    type: 'x',
    value: content.width + 2 * frame.width
  });
  data.push({
    selector: 'tri_2',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'tri_3',
    type: 'x',
    value: 2 * frame.width + content.width
  });
  data.push({
    selector: 'tri_3',
    type: 'y',
    value: relief.height + frame.height + content.height - (relief.height - frame.height)
  }); //set depth frame size

  data.push({
    selector: 'depthFrame_0',
    type: 'width',
    value: content.width + 2 * frame.width - relief.width
  });
  data.push({
    selector: 'depthFrame_0',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'depthFrame_1',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'depthFrame_1',
    type: 'height',
    value: content.height + 2 * frame.height - relief.height
  }); //set depth frame position

  data.push({
    selector: 'depthFrame_0',
    type: 'x',
    value: relief.width
  });
  data.push({
    selector: 'depthFrame_0',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'depthFrame_1',
    type: 'x',
    value: 2 * frame.width + content.width
  });
  data.push({
    selector: 'depthFrame_1',
    type: 'y',
    value: relief.height
  });
  /*
      data.push({
          selector: 'dynamic-color',
          type: 'width',
          value: 2 * frame.width + relief.width + content.width
      });
  
      data.push({
          selector: 'dynamic-color',
          type: 'height',
          value: 2 * frame.height + relief.height + content.height
      });
  */

  data.push({
    selector: 'dynamic-color',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'dynamic-color',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'innerFrame_0_background',
    type: 'width',
    value: content.width
  });
  data.push({
    selector: 'innerFrame_0_background',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'innerFrame_2_background',
    type: 'width',
    value: content.width
  });
  data.push({
    selector: 'innerFrame_2_background',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'innerFrame_1_background',
    type: 'height',
    value: content.height
  });
  data.push({
    selector: 'innerFrame_1_background',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'innerFrame_3_background',
    type: 'height',
    value: content.height
  });
  data.push({
    selector: 'innerFrame_3_background',
    type: 'width',
    value: frame.width
  }); //cadre interne position

  data.push({
    selector: 'innerFrame_0_background',
    type: 'x',
    value: frame.width
  });
  data.push({
    selector: 'innerFrame_0_background',
    type: 'y',
    value: relief.height + frame.height + content.height
  });
  data.push({
    selector: 'innerFrame_1_background',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'innerFrame_1_background',
    type: 'y',
    value: relief.height + frame.height
  });
  data.push({
    selector: 'innerFrame_2_background',
    type: 'x',
    value: frame.width
  });
  data.push({
    selector: 'innerFrame_2_background',
    type: 'y',
    value: relief.height
  });
  data.push({
    selector: 'innerFrame_3_background',
    type: 'x',
    value: content.width + frame.width
  });
  data.push({
    selector: 'innerFrame_3_background',
    type: 'y',
    value: relief.height + frame.height
  }); // corner size :

  data.push({
    selector: 'corner_0_background',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_0_background',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'corner_1_background',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_1_background',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'corner_2_background',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_2_background',
    type: 'height',
    value: frame.height
  });
  data.push({
    selector: 'corner_3_background',
    type: 'width',
    value: frame.width
  });
  data.push({
    selector: 'corner_3_background',
    type: 'height',
    value: frame.height
  }); // corner position :

  data.push({
    selector: 'corner_0_background',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'corner_0_background',
    type: 'y',
    value: relief.height + frame.height + content.height
  });
  data.push({
    selector: 'corner_1_background',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'corner_1_background',
    type: 'y',
    value: relief.height
  });
  data.push({
    selector: 'corner_2_background',
    type: 'x',
    value: frame.width + content.width
  });
  data.push({
    selector: 'corner_2_background',
    type: 'y',
    value: relief.height
  });
  data.push({
    selector: 'corner_3_background',
    type: 'x',
    value: frame.width + content.width
  });
  data.push({
    selector: 'corner_3_background',
    type: 'y',
    value: relief.height + frame.height + content.height
  }); //triangle size

  data.push({
    selector: 'tri_0_background',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_0_background',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'tri_1_background',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_1_background',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'tri_2_background',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_2_background',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'tri_3_background',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'tri_3_background',
    type: 'height',
    value: relief.height
  }); //triangle position

  data.push({
    selector: 'tri_0_background',
    type: 'x',
    value: 0
  });
  data.push({
    selector: 'tri_0_background',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'tri_1_background',
    type: 'x',
    value: content.width + 2 * frame.width
  });
  data.push({
    selector: 'tri_1_background',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'tri_2_background',
    type: 'x',
    value: content.width + 2 * frame.width
  });
  data.push({
    selector: 'tri_2_background',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'tri_3_background',
    type: 'x',
    value: 2 * frame.width + content.width
  });
  data.push({
    selector: 'tri_3_background',
    type: 'y',
    value: relief.height + frame.height + content.height - (relief.height - frame.height)
  }); //set depth frame size

  data.push({
    selector: 'depthFrame_0_background',
    type: 'width',
    value: content.width + 2 * frame.width - relief.width
  });
  data.push({
    selector: 'depthFrame_0_background',
    type: 'height',
    value: relief.height
  });
  data.push({
    selector: 'depthFrame_1_background',
    type: 'width',
    value: relief.width
  });
  data.push({
    selector: 'depthFrame_1_background',
    type: 'height',
    value: content.height + 2 * frame.height - relief.height
  }); //set depth frame position

  data.push({
    selector: 'depthFrame_0_background',
    type: 'x',
    value: relief.width
  });
  data.push({
    selector: 'depthFrame_0_background',
    type: 'y',
    value: 0
  });
  data.push({
    selector: 'depthFrame_1_background',
    type: 'x',
    value: 2 * frame.width + content.width
  });
  data.push({
    selector: 'depthFrame_1_background',
    type: 'y',
    value: relief.height
  }); // Apply Them all!

  data.forEach(function (item) {
    new UpdateMultipleElements(context, item);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (frameCanvas);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

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
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=modify-multiple-elements.js.map