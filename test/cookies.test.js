import { expect } from 'chai';
import * as cookies from '../lib/cookies';

describe('lib: cookies test', function () {
  beforeEach(function () {
    cookies.setItem('name', 'ataola');
  });

  it('getItem: expect ataola when call function getItem with params ataola', function () {
    expect(cookies.getItem('name')).to.equal('ataola');
  });

  it('hasItem: expect true when call function hasItem with params name', function () {
    expect(cookies.hasItem('name')).to.equal(true);
  });

  it('keys: expect ["name"] when call function keys', function () {
    expect(cookies.keys()).to.deep.equal(['name']);
  });

  it('removeItem: expect true when call function removeItem with params name', function () {
    expect(cookies.removeItem('name')).to.equal(true);
  });
});
