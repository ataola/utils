import { expect } from 'chai';
import { formatMoney } from '../lib/num';

describe('lib: num test', function () {
  it('formatMoney: expect 1,234,567,890 when call function with params "1234567890"', function () {
    expect(formatMoney('1234567890')).to.equals('1,234,567,890');
  });
});
