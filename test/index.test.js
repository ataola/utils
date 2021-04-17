import { expect } from 'chai';
import { getVersion } from '../index';
import pkg from '../package.json';

describe('version test', function () {
  it('getVersion return value should equal version', function () {
    expect(getVersion()).to.equal(pkg.version);
  });
});
