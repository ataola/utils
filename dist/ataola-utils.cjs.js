/*!
 * ataola-utils.js v0.1.8
 * (c) 2021-2021 ataola(Jiangtao Zheng)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.map.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/esnext.map.delete-all.js');
require('core-js/modules/esnext.map.every.js');
require('core-js/modules/esnext.map.filter.js');
require('core-js/modules/esnext.map.find.js');
require('core-js/modules/esnext.map.find-key.js');
require('core-js/modules/esnext.map.includes.js');
require('core-js/modules/esnext.map.key-of.js');
require('core-js/modules/esnext.map.map-keys.js');
require('core-js/modules/esnext.map.map-values.js');
require('core-js/modules/esnext.map.merge.js');
require('core-js/modules/esnext.map.reduce.js');
require('core-js/modules/esnext.map.some.js');
require('core-js/modules/esnext.map.update.js');
require('core-js/modules/web.dom-collections.iterator.js');
require('core-js/modules/es.weak-map.js');
require('core-js/modules/esnext.weak-map.delete-all.js');
require('core-js/modules/es.set.js');
require('core-js/modules/esnext.set.add-all.js');
require('core-js/modules/esnext.set.delete-all.js');
require('core-js/modules/esnext.set.difference.js');
require('core-js/modules/esnext.set.every.js');
require('core-js/modules/esnext.set.filter.js');
require('core-js/modules/esnext.set.find.js');
require('core-js/modules/esnext.set.intersection.js');
require('core-js/modules/esnext.set.is-disjoint-from.js');
require('core-js/modules/esnext.set.is-subset-of.js');
require('core-js/modules/esnext.set.is-superset-of.js');
require('core-js/modules/esnext.set.join.js');
require('core-js/modules/esnext.set.map.js');
require('core-js/modules/esnext.set.reduce.js');
require('core-js/modules/esnext.set.some.js');
require('core-js/modules/esnext.set.symmetric-difference.js');
require('core-js/modules/esnext.set.union.js');
require('core-js/modules/es.weak-set.js');
require('core-js/modules/esnext.weak-set.add-all.js');
require('core-js/modules/esnext.weak-set.delete-all.js');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
require('core-js/modules/es.promise.js');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
require('core-js/modules/web.dom-collections.for-each.js');
require('core-js/modules/es.string.match.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var _regeneratorRuntime__default = /*#__PURE__*/ _interopDefaultLegacy(
  _regeneratorRuntime
);
var _slicedToArray__default = /*#__PURE__*/ _interopDefaultLegacy(
  _slicedToArray
);

var version = '0.1.8';

function get(key) {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' +
            encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$'
        ),
        '$1'
      )
    ) || null
  );
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
        expires =
          end === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : '; max-age=' + end;
        break;

      case String:
        expires = '; expires=' + end;
        break;

      case Date:
        expires = '; expires=' + end.toUTCString();
        break;
    }
  }

  document.cookie =
    encodeURIComponent(key) +
    '=' +
    encodeURIComponent(value) +
    expires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '');
  return true;
}
/**
 *
 * @param {string} key
 * @returns {booelan}
 */

function has(key) {
  return new RegExp(
    '(?:^|;\\s*)' +
      encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
      '\\s*\\='
  ).test(document.cookie);
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

  document.cookie =
    encodeURIComponent(key) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '');
  return true;
}
/**
 *
 * @returns {array}
 */

function keys() {
  var keys = document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:\=[^;]*)?;\s*/);

  for (var i = 0; i < keys.length; i++) {
    keys[i] = decodeURIComponent(keys[i]);
  }

  return keys;
}

var cookies = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  keys: keys,
  get: get,
  set: set,
  has: has,
  remove: remove,
});

/**
 * @description: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 * @param {element} element https://developer.mozilla.org/zh-CN/docs/Web/API/Element
 * @returns {DOMRect} {left, top, right, bottom, x, y, width, height}, 返回的 DOMRect对象中的属性不是自己的属性。
 * 当使用in 和 for...in 运算符时能成功查找到返回的属性，但使用其他API（例如Object.keys（））查找时将失败。 而且，ES2015和更高版本的功能（如Object.assign（）和对象rest/spread）将无法复制返回的属性。
 */

function getDOMRect(element) {
  return (
    (element.getBoundingClientRect && element.getBoundingClientRect()) || null
  );
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
  var x =
    window.pageXOffset ||
    window.scrollX ||
    (typeof dom.scrollLeft == 'number' ? dom : document.body).scrollLeft;
  var y =
    window.pageYOffset ||
    window.scrollY ||
    (typeof dom.scrollTop == 'number' ? dom : document.body).scrollTop;
  return {
    x: x + left,
    y: y + top,
  };
}

var element = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  getDOMRect: getDOMRect,
  getPosition: getPosition,
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
  return typeof value === 'symbol';
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
  var type = typeof value;
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
  var proto = (isFunction(constructor) && constructor.prototype) || objectProto;
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
  return [
    Error,
    URIError,
    EvalError,
    TypeError,
    RangeError,
    SyntaxError,
    ReferenceError,
  ].some((item) => {
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
  } else if (
    isMap(value) ||
    isWeakMap(value) ||
    isSet(value) ||
    isWeakSet(value)
  ) {
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

var judge = /*#__PURE__*/ Object.freeze({
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
  isDate: isDate,
});

function randomSimple() {
  return Math.random().toString(32).substr(2);
}

var generator = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  randomSimple: randomSimple,
});

function timing() {
  var name,
    cb,
    _args = arguments;
  return _regeneratorRuntime__default['default'].async(
    function timing$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            name =
              _args.length > 0 && _args[0] !== undefined ? _args[0] : 'test';
            cb = _args.length > 1 ? _args[1] : undefined;
            console.time(name);
            _context.t0 = typeof cb === 'function';

            if (!_context.t0) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return _regeneratorRuntime__default['default'].awrap(cb());

          case 7:
            console.timeEnd(name);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    },
    null,
    null,
    null,
    Promise
  );
}

function timeConsuming(cb) {
  var start, end, res;
  return _regeneratorRuntime__default['default'].async(
    function timeConsuming$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            start = window.performance.now();
            _context2.t0 = typeof cb === 'function';

            if (!_context2.t0) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return _regeneratorRuntime__default['default'].awrap(cb());

          case 5:
            end = window.performance.now();
            res = (end - start).toFixed(2);
            console.log('time-consuming: '.concat(res, ' ms'));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    },
    null,
    null,
    null,
    Promise
  );
}

var logger = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  timing: timing,
  timeConsuming: timeConsuming,
});

function getQueryParameters(url) {
  var paramStr = decodeURIComponent(url).split('?')[1];

  if (!paramStr) {
    return {};
  }

  var paramArr = paramStr.split('&');
  var res = {};
  paramArr.forEach((param) => {
    var _param$split = param.split('='),
      _param$split2 = _slicedToArray__default['default'](_param$split, 2),
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

var url = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  getQueryParameterByRegExp: getQueryParameterByRegExp,
  getQueryParametersByRegExp: getQueryParametersByRegExp,
  getQueryParameters: getQueryParameters,
});

/**
 *
 * @returns {string}
 */

function getVersion() {
  return version;
}

exports.cookies = cookies;
exports.element = element;
exports.generator = generator;
exports.getVersion = getVersion;
exports.judge = judge;
exports.logger = logger;
exports.url = url;
//# sourceMappingURL=ataola-utils.cjs.js.map
