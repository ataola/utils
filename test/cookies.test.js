import { expect } from 'chai';
import * as cookies from '../lib/cookies';

describe('lib: cookies test', function () {
  beforeEach(function () {
    cookies.set('name', 'ataola');
  });

  it('get: expect ataola when call function get with params ataola', function () {
    expect(cookies.get('name')).to.equal('ataola');
  });

  it('has: expect true when call function has with params name', function () {
    expect(cookies.has('name')).to.equal(true);
  });

  it('keys: expect ["name"] when call function keys', function () {
    expect(cookies.keys()).to.deep.equal(['name']);
  });

  it('remove: expect true when call function remove with params name', function () {
    expect(cookies.remove('name')).to.equal(true);
  });
});
