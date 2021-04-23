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
//     expect(isFunction(class superMan {})).to.true;
//     expect(isFunction(() => {})).to.true;
//     expect(isFunction(async () => {})).to.true;
//     expect(isFunction(function* superGirl() {})).to.true;
    expect(isFunction(Math.round)).to.true;
    // typeof /helloworld/ === 'object';
    expect(isFunction(/helloworld/)).to.false;
    expect(isFunction(RegExp)).to.true;
  });
});
