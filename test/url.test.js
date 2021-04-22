import { expect } from 'chai';
import {
  getQueryParameters,
  getQueryParameterByRegExp,
  getQueryParametersByRegExp,
} from '../lib/url';

describe('lib: url test', function () {
  it('getQueryParameters: expect { name: "ataola", age: "24" } when call function with params "https://zhengjiangtao.cn?name=ataola&age=24"', function () {
    expect(
      getQueryParameters('https://zhengjiangtao.cn?name=ataola&age=24')
    ).to.deep.equals({ name: 'ataola', age: '24' });
  });

  it('getQueryParametersByRegExp: expect { name: "ataola", age: "24" } when call function with params "https://zhengjiangtao.cn?name=ataola&age=24"', function () {
    expect(
      getQueryParametersByRegExp('https://zhengjiangtao.cn?name=ataola&age=24')
    ).to.deep.equals({ name: 'ataola', age: '24' });
  });

  it('getQueryParameterByRegExp: expect "ataola" when call function with params "https://zhengjiangtao.cn?name=ataola&age=24"', function () {
    expect(
      getQueryParameterByRegExp(
        'https://zhengjiangtao.cn?name=ataola&age=24',
        'name'
      )
    ).to.equals('ataola');
  });
});
