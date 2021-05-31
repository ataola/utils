/*!
 * ataola-utils.js v0.1.10
 * (c) 2021-2021 ataola(Jiangtao Zheng)
 * Released under the MIT License.
 */
var version="0.1.10";

/**
 *
 * @param {string} key
 * @returns {string|null}
 */

function get(key) {
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
}
/**
 *
 * @param {string} key
 * @param {any} value
 * @param {string|number|date} end
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 * @returns {boolean}
 */


function set(key, value, end, path, domain, secure) {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return false;
  }

  var expires = '';

  if (end) {
    switch (end.constructor) {
      case Number:
        expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
        break;

      case String:
        expires = '; expires=' + end;
        break;

      case Date:
        expires = '; expires=' + end.toUTCString();
        break;
    }
  }

  document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
  return true;
}
/**
 *
 * @param {string} key
 * @returns {booelan}
 */


function has(key) {
  return new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
}
/**
 *
 * @param {string} key
 * @param {string} path
 * @param {string} domain
 * @returns {boolean}
 */


function remove(key, path, domain) {
  if (!key || !has(key)) {
    return false;
  }

  document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
  return true;
}
/**
 *
 * @returns {array}
 */


function keys() {
  var keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);

  for (var i = 0; i < keys.length; i++) {
    keys[i] = decodeURIComponent(keys[i]);
  }

  return keys;
}

var cookies = /*#__PURE__*/Object.freeze({
  __proto__: null,
  keys: keys,
  get: get,
  set: set,
  has: has,
  remove: remove
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * @description: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 * @param {element} element https://developer.mozilla.org/zh-CN/docs/Web/API/Element
 * @returns {DOMRect} {left, top, right, bottom, x, y, width, height}, 返回的 DOMRect对象中的属性不是自己的属性。
 * 当使用in 和 for...in 运算符时能成功查找到返回的属性，但使用其他API（例如Object.keys（））查找时将失败。 而且，ES2015和更高版本的功能（如Object.assign（）和对象rest/spread）将无法复制返回的属性。
 */

function getDOMRect(element) {
  return element.getBoundingClientRect && element.getBoundingClientRect() || null;
}
/**
 * @description 元素相对于网页左上角顶点（0，0）的top和left
 * @param {element} element
 * @returns {object} {x, y}
 */


function getPosition(element) {
  var _getDOMRect = getDOMRect(element),
      left = _getDOMRect.left,
      top = _getDOMRect.top;

  var dom = document.documentElement || document.body.parentNode;
  var x = window.pageXOffset || window.scrollX || (typeof dom.scrollLeft == 'number' ? dom : document.body).scrollLeft;
  var y = window.pageYOffset || window.scrollY || (typeof dom.scrollTop == 'number' ? dom : document.body).scrollTop;
  return {
    x: x + left,
    y: y + top
  };
}

var element = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getDOMRect: getDOMRect,
  getPosition: getPosition
});

/**
 * @external https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures
 * 数据类型(EMCA latest): 9种
 * 原始类型：undefined, Boolean, String, Number, Bigint, Symbol
 * null, 注意 typeof null === 'object'
 * Object: Object, Array, Function, Map, Set, WeekMap, WeekSet, Date,
 * Function: RegExp
 */

/**
 *
 * @param {*} value
 * @returns {boolean}
 */

function isNull(value) {
  return value === null;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isString(value) {
  return typeof value === 'string';
}
/**
 *
 * @param {*} value
 * @returns {number}
 */


function isNumber(value) {
  return typeof value === 'number';
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isSymbol(value) {
  return _typeof(value) === 'symbol';
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isUndefined(value) {
  return value === undefined;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isBoolean(value) {
  return value === true || value === false;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isBigInt(value) {
  return typeof value === 'bigint';
}
/**
 * @description
 * @param {*} value
 * @return {boolean}
 */


function isFunction(value) {
  return typeof value === 'function';
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isObject(value) {
  var type = _typeof(value);

  return value !== null && (type === 'object' || type === 'function');
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isPrototype(value) {
  var objectProto = Object.prototype;
  var constructor = value && value.constructor;
  var proto = isFunction(constructor) && constructor.prototype || objectProto;
  return value === proto;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isArray(value) {
  return value instanceof Array;
} // 另一种思路是调用toString 去看它是不是 [Object Map]

/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isMap(value) {
  return value instanceof Map;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isWeakMap(value) {
  return value instanceof WeakMap;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isSet(value) {
  return value instanceof Set;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isWeakSet(value) {
  return value instanceof WeakSet;
}
/**
 * @example `Error`, `EvalError`, `RangeError`, `ReferenceError`,`SyntaxError`, `TypeError`, `URIError`
 * @param {*} value
 * @returns {boolean}
 */


function isError(value) {
  return [Error, URIError, EvalError, TypeError, RangeError, SyntaxError, ReferenceError].some(function (item) {
    return value instanceof item;
  });
} // https://getbootstrap.com/docs/4.1/layout/overview/
// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

/**
 * Extra small devices (portrait phones, less than 576px)
 * @media (max-width: 575.98px) { ... }
 * @returns {boolean}
 */


function isScreenXS() {
  var _getDOMRect = getDOMRect(document.body),
      width = _getDOMRect.width;

  return width <= 575.98;
}
/**
 * Small devices (landscape phones, 576px and up)
 * @media (min-width: 576px) and (max-width: 767.98px) { ... }
 * @returns {boolean}
 */


function isScreenSM() {
  var _getDOMRect2 = getDOMRect(document.body),
      width = _getDOMRect2.width;

  return width >= 576 && width <= 767.98;
}
/**
 * Medium devices (tablets, 768px and up)
 * @media (min-width: 768px) and (max-width: 991.98px) { ... }
 * @returns {boolean}
 */


function isScreenMD() {
  var _getDOMRect3 = getDOMRect(document.body),
      width = _getDOMRect3.width;

  return width >= 768 && width <= 991.98;
}
/**
 * Large devices (desktops, 992px and up)
 * @media (min-width: 992px) and (max-width: 1199.98px) { ... }
 * @returns {boolean}
 */


function isScreenLG() {
  var _getDOMRect4 = getDOMRect(document.body),
      width = _getDOMRect4.width;

  return width >= 992 && width <= 1199.98;
}
/**
 * Extra large devices (large desktops, 1200px and up)
 * @media (min-width: 1200px) { ... }
 * @returns {boolean}
 */


function isScreenXL() {
  var _getDOMRect5 = getDOMRect(document.body),
      width = _getDOMRect5.width;

  return width >= 1200;
}
/**
 *
 * @param {*} value
 * @returns
 */


function isEmpty(value) {
  // null 0 '' false undefined
  if (!value) {
    return true;
  }

  if (isArray(value)) {
    return !value.length;
  } else if (isObject(value)) {
    return !Object.keys(value).length;
  } else if (isMap(value) || isWeakMap(value) || isSet(value) || isWeakSet(value)) {
    return !value.size;
  }

  return false;
}
/**
 *
 * @param {*} value
 * @returns {boolean}
 */


function isDate(value) {
  return value instanceof Date;
}

var judge = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isNull: isNull,
  isString: isString,
  isNumber: isNumber,
  isSymbol: isSymbol,
  isUndefined: isUndefined,
  isBoolean: isBoolean,
  isBigInt: isBigInt,
  isFunction: isFunction,
  isArray: isArray,
  isObject: isObject,
  isPrototype: isPrototype,
  isMap: isMap,
  isWeakMap: isWeakMap,
  isSet: isSet,
  isWeakSet: isWeakSet,
  isError: isError,
  isScreenXS: isScreenXS,
  isScreenSM: isScreenSM,
  isScreenMD: isScreenMD,
  isScreenLG: isScreenLG,
  isScreenXL: isScreenXL,
  isEmpty: isEmpty,
  isDate: isDate
});

/**
 *
 * @returns {string} length 10 or 11
 */

function randomSimple() {
  return Math.random().toString(32).substr(2);
}

var generator = /*#__PURE__*/Object.freeze({
  __proto__: null,
  randomSimple: randomSimple
});

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
}(runtime));

var regenerator = runtime.exports;

function timing() {
  return _timing.apply(this, arguments);
}

function _timing() {
  _timing = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var name,
        cb,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'test';
            cb = _args.length > 1 ? _args[1] : undefined;
            console.time(name);
            _context.t0 = typeof cb === 'function';

            if (!_context.t0) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return cb();

          case 7:
            console.timeEnd(name);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _timing.apply(this, arguments);
}

function timeConsuming(_x) {
  return _timeConsuming.apply(this, arguments);
}

function _timeConsuming() {
  _timeConsuming = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(cb) {
    var start, end, res;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            start = window.performance.now();
            _context2.t0 = typeof cb === 'function';

            if (!_context2.t0) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return cb();

          case 5:
            end = window.performance.now();
            res = (end - start).toFixed(2);
            console.log("time-consuming: ".concat(res, " ms"));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _timeConsuming.apply(this, arguments);
}

var logger = /*#__PURE__*/Object.freeze({
  __proto__: null,
  timing: timing,
  timeConsuming: timeConsuming
});

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function getQueryParameters(url) {
  var paramStr = decodeURIComponent(url).split('?')[1];

  if (!paramStr) {
    return {};
  }

  var paramArr = paramStr.split('&');
  var res = {};
  paramArr.forEach(function (param) {
    var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

    res[key] = value;
  });
  return res;
}
/**
 *
 * @param {string} url
 * @returns {object}
 */


function getQueryParametersByRegExp(url) {
  var parameters = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    parameters[key] = value;
  });
  return parameters;
}
/**
 * @external  https://www.regex-tutorial.com/urlParameter.html
 * @param {string} url
 * @param {string} name
 * @returns {string}
 */


function getQueryParameterByRegExp(url, name) {
  var reg = new RegExp('[?&]' + name + '=([^&]+).*$');
  var res = url.match(reg);
  return res === null ? '' : decodeURIComponent(res[1].replace(/\+/g, ' '));
}

var url = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getQueryParameterByRegExp: getQueryParameterByRegExp,
  getQueryParametersByRegExp: getQueryParametersByRegExp,
  getQueryParameters: getQueryParameters
});

/**
 *
 * @returns {string}
 */

function getVersion() {
  return version;
}

export { cookies, element, generator, getVersion, judge, logger, url };
//# sourceMappingURL=ataola-utils.esm.js.map
