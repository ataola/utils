import { expect } from 'chai';
import { randomSimple } from '../lib/generator';

describe('lib: generator test', function () {
  it('randomSimple: expect len <= 11 when call function', function () {
    expect(randomSimple().length).to.lte(11);
  });
});
