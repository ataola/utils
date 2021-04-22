'use strict';

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

function isObject(value) {}

function isMap(value) {}

function isWeekMap(value) {}

function isSet(value) {}

function isWeakSet(value) {}

function isDate(value) {}

function isMatch(source, target) {}

function isEqual(source, target) {}

function isError(value) {}

function isEmpty(value) {}

function isBuffer(value) {}

function isDOM(value) {}

// https://getbootstrap.com/docs/4.1/layout/overview/

function isSmallDevice() {}

function isExtraSmallDevice() {}

function isMediumDevice() {}

function isLargeDevice() {}

function isExtraLargeDevice() {}

export {
  isNull,
  isString,
  isNumber,
  isSymbol,
  isUndefined,
  isBoolean,
  isBigInt,
  isFunction,
};
