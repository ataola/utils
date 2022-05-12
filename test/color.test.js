import { expect } from 'chai';
import { toHEX } from '../lib/color';

describe('lib: num test', function () {
  it('formatMoney: expect rgb(0, 0, 0) when call function with params "000000"', function () {
    expect(toHEX({ r: 0, g: 0, b: 0 })).to.equals('000000');
  });

  it('formatMoney: expect rgb(255, 255, 255) when call function with params "ffffff"', function () {
    expect(toHEX({ r: 255, g: 255, b: 255 })).to.equals('ffffff');
  });
});
