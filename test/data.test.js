import { expect } from 'chai';

import { deepFreeZe } from '../lib/data';

describe('lib: data test', function () {
  it('deepFreeze: obj.internal is not extensible', function () {
    let obj = { internal: {} };
    obj = deepFreeZe(obj);
    expect(Object.isExtensible(obj.internal)).to.be.false;
  });
});
