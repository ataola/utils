import { expect } from 'chai';
import { getDOMRect, getPosition } from '../lib/element';

describe('lib: element test', function () {
  it('getDOMRect: ', function () {
    const { x, y, left, right, top, bottom, width, height } = getDOMRect(
      document.body
    ).toJSON();
    expect(x).to.equal(8);
    expect(y).to.equal(8);
    expect(left).to.equal(8);
    expect(top).to.equal(8);
    expect(right).to.be.oneOf([1192, 792]);
    expect(bottom).to.equal(8);
    expect(width).to.be.oneOf([1184, 784]);
    expect(height).to.equal(0);
  });
  it('getPosition', function () {
    const div = document.createElement('div');
    div.style.width = 600;
    div.style.height = 400;
    document.body.style.padding = '20px';
    div.innerText = 'world peace';
    div.id = 'app';
    document.body.appendChild(div);
    expect(getPosition(document.body)).to.deep.equal({
      x: 8,
      y: 8,
    });
    expect(getPosition(document.getElementById('app'))).to.deep.equal({
      x: 28,
      y: 28,
    });
  });
});
