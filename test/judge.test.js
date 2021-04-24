import { expect } from 'chai';
import {
  isNull,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isBoolean,
  isBigInt,
  isFunction,
  isArray,
  isObject,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isError,
  isDate,
  isPrototype,
  isEmpty,
  isScreenXS,
  isScreenSM,
  isScreenMD,
  isScreenLG,
  isScreenXL,
} from '../lib/judge';

describe('lib: judge test', function () {
  it('isNull: expect true when call function with params null', function () {
    expect(isNull(null)).to.true;
    expect(isNull(0)).to.false;
  });

  it('isString: expect true when call function with params in String type', function () {
    expect(isString(2021)).to.false;
    expect(isString('2021')).to.true;
  });

  it('isNumber: expect true when call function with params in Number type', function () {
    expect(isNumber(2021)).to.true;
    expect(isNumber('2021')).to.false;
    expect(isNumber(Infinity)).to.true;
    expect(isNumber(Number.MIN_VALUE)).to.true;
  });

  it('isSymbol: expect true when call function with params in Symbol type', function () {
    expect(isSymbol(Symbol.iterator)).to.true;
    expect(isSymbol('2021')).to.false;
  });

  it('isUndefined: expect true when call function with params in undefined', function () {
    expect(isUndefined(0)).to.false;
    expect(isUndefined(void 0)).to.true;
    expect(isUndefined(null)).to.false;
  });

  it('isBoolean: expect true when call function with params in Boolean type', function () {
    expect(isBoolean(true)).to.true;
    expect(isBoolean(false)).to.true;
    expect(isBoolean(0)).to.false;
    expect(isBoolean(1)).to.false;
  });

  it('isBigInt: expect true when call function with params in Bigint type', function () {
    expect(isBigInt(2021n)).to.true;
    expect(isBigInt(2021)).to.false;
  });

  it('isFunction: expect true when call function with params in Function type', function () {
    expect(isFunction(class superMan {})).to.true;
    expect(isFunction(() => {})).to.true;
    expect(isFunction(async () => {})).to.true;
    expect(isFunction(function* superGirl() {})).to.true;
    expect(isFunction(Math.round)).to.true;
    // typeof /helloworld/ === 'object';
    expect(isFunction(/helloworld/)).to.false;
    expect(isFunction(RegExp)).to.true;
  });

  it('isArray: expect true when call function with params in Array type', function () {
    expect(isArray([])).to.be.true;
    expect(isArray(new Array())).to.be.true;
    expect(isArray(Function)).to.be.false;
    expect(isArray({})).to.be.false;
  });

  it('isObject: expect true when call function with params in Object type', function () {
    expect(isObject(null)).to.be.false;
    expect(isObject({})).to.be.true;
    expect(isObject(Function)).to.be.true;
    expect(isObject([1, 2, 3])).to.be.true;
  });

  it('isMap: expect true when call function with params in Map type', function () {
    const map = new Map();
    const weekMap = new WeakMap();
    expect(isMap(map)).to.be.true;
    expect(isMap(weekMap)).to.be.false;
  });

  it('isWeakMap: expect true when call function with params in WeakMap type', function () {
    const weakMap = new WeakMap();
    expect(isWeakMap(weakMap)).to.be.true;
  });

  it('isSet: expect true when call function with params in Set type', function () {
    const set = new Set();
    expect(isSet(set)).to.be.true;
  });

  it('isWeakSet: expect true when call function with params in WeakSet type', function () {
    const weakSet = new WeakSet();
    expect(isWeakSet(weakSet)).to.be.true;
  });

  it('isError: expect true when call function with params in Error type', function () {
    const error = new Error();
    expect(isError(error)).to.be.true;
  });

  it('isDate: expect true when call function with params in Date type', function () {
    expect(isDate(new Date())).to.be.true;
    expect(isDate('2021-04-24')).to.be.false;
  });

  it('isPrototype: expect true when call function with prototype object', function () {
    expect(isPrototype(Date)).to.be.false;
    expect(isPrototype(Date.prototype)).to.be.true;
  });

  it('isEmpty: expect true when call function with prototype 0 "" null undefined {} [] ...', function () {
    expect(isEmpty('')).to.be.true;
    expect(isEmpty(0)).to.be.true;
    expect(isEmpty(null)).to.be.true;
    expect(isEmpty(undefined)).to.be.true;
    expect(isEmpty([])).to.be.true;
    expect(isEmpty({})).to.be.true;
    expect(isEmpty(new WeakSet())).to.be.true;
    expect(isEmpty(new WeakMap())).to.be.true;
    expect(isEmpty(new Map())).to.be.true;
    expect(isEmpty(new Set())).to.be.true;
  });

  it('isScreen...', function () {
    expect(isScreenXS()).to.be.false;
    expect(isScreenSM()).to.be.false;
    expect(isScreenMD()).to.be.oneOf([true, false]);
    expect(isScreenLG()).to.be.oneOf([true, false]);
    expect(isScreenXL()).to.be.false;
  });
});
