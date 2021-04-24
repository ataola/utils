'use strict';
import { getDOMRect } from './element';

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
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
function isPrototype(value) {
  const objectProto = Object.prototype;
  const constructor = value && value.constructor;
  const proto =
    (isFunction(constructor) && constructor.prototype) || objectProto;
  return value === proto;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */

function isArray(value) {
  return value instanceof Array;
}

// 另一种思路是调用toString 去看它是不是 [Object Map]
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
}

// https://getbootstrap.com/docs/4.1/layout/overview/
// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

/**
 * Extra small devices (portrait phones, less than 576px)
 * @media (max-width: 575.98px) { ... }
 * @returns {boolean}
 */
function isScreenXS() {
  const { width } = getDOMRect(document.body);
  return width <= 575.98;
}

/**
 * Small devices (landscape phones, 576px and up)
 * @media (min-width: 576px) and (max-width: 767.98px) { ... }
 * @returns {boolean}
 */
function isScreenSM() {
  const { width } = getDOMRect(document.body);
  return width >= 576 && width <= 767.98;
}

/**
 * Medium devices (tablets, 768px and up)
 * @media (min-width: 768px) and (max-width: 991.98px) { ... }
 * @returns {boolean}
 */
function isScreenMD() {
  const { width } = getDOMRect(document.body);
  return width >= 768 && width <= 991.98;
}

/**
 * Large devices (desktops, 992px and up)
 * @media (min-width: 992px) and (max-width: 1199.98px) { ... }
 * @returns {boolean}
 */
function isScreenLG() {
  const { width } = getDOMRect(document.body);
  return width >= 992 && width <= 1199.98;
}

/**
 * Extra large devices (large desktops, 1200px and up)
 * @media (min-width: 1200px) { ... }
 * @returns {boolean}
 */
function isScreenXL() {
  const { width } = getDOMRect(document.body);
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

export {
  isNull,
  isString,
  isNumber,
  isSymbol,
  isUndefined,
  isBoolean,
  isBigInt,
  isFunction,
  isArray,
  isObject,
  isPrototype,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isError,
  isScreenXS,
  isScreenSM,
  isScreenMD,
  isScreenLG,
  isScreenXL,
  isEmpty,
  isDate,
};
