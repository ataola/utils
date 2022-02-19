import { expect } from 'chai';

import { curry } from '../lib/baguwen';

describe('lib: baguwen test', function () {
  it('curry', function () {
    function add(a, b, c) {
      return a + b + c;
    }
    let addCurrry = curry(add);
    expect(addCurrry(1)(2)(3)).to.equal(6);
  });
});
