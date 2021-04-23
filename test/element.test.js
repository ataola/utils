import { expect } from 'chai';
import { getDOMRect, getPosition } from '../lib/element';

describe('lib: element test', function () {
  it('getDOMRect: ', function () {
    expect(getDOMRect(document.body).toJSON()).to.deep.equal({
      bottom: 8,
      height: 0,
      left: 8,
      right: 792,
      top: 8,
      width: 784,
      x: 8,
      y: 8,
    });
  });
  it('getPosition', function () {
    expect(getPosition(document.body)).to.deep.equal({
      x: 0,
      y: 0,
    });
  });
});
