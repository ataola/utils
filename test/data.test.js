import { expect } from 'chai';

import { deepFreeZe, cloneDeep } from '../lib/data';

describe('lib: data test', function () {
  it('deepFreeze: obj.internal is not extensible', function () {
    let obj = { internal: {} };
    obj = deepFreeZe(obj);
    expect(Object.isExtensible(obj.internal)).to.be.false;
  });

  it('cloneDeep', function () {
    const arr = [{ x: 1 }, { x: 2 }];
    const newArr = cloneDeep(arr);
    newArr[0].x = 100;
    expect(arr[0].x).to.equal(1);
    expect(newArr[0].x).to.equal(100);
  });
});
