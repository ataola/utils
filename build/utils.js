(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.utils = {})));
})(this, function (exports) {
  'use strict';

  var name = '@ataola/utils';
  var version = '0.1.6';
  var description =
    "ataola's utils: maybe publish a feature one week, to record something i think or meet.";
  var main = 'build/utils.js';
  var module = 'build/utils.module.js';
  var scripts = {
    push: './push',
    pull: './pull',
    codecov: 'codecov',
    eslint: 'eslint . --ext .js --fix',
    'husky:prepare': 'husky install',
    'husky:add': "husky add .husky/pre-commit 'npm run lint'",
    'git:add': 'git add -A',
    lint: 'lint-staged',
    'karma:init': 'karma init ./karma.conf.js',
    'karma:test': 'karma start ./karma.conf.js',
    format: "prettier --write '**/*.{js,jsx,ts,tsx,json,md}'",
    build: 'rollup -c',
    'build-closure':
      'rollup -c && google-closure-compiler --language_in=ECMASCRIPT5_STRICT --js build/utils.js --js_output_file build/utils.min.js',
  };
  var repository = {
    type: 'git',
    url: 'git+https://github.com/ataola/utils.git',
  };
  var keywords = ['javascript', 'utils'];
  var author = 'ataola (zjt613@gmail.com)';
  var license = 'MIT';
  var bugs = { url: 'https://github.com/ataola/utils/issues' };
  var homepage = 'https://github.com/ataola/utils#readme';
  var devDependencies = {
    '@babel/core': '^7.13.15',
    '@babel/eslint-parser': '^7.13.14',
    '@babel/plugin-proposal-class-properties': '^7.13.0',
    '@babel/plugin-transform-arrow-functions': '^7.13.0',
    '@babel/plugin-transform-async-to-generator': '^7.13.0',
    '@babel/plugin-transform-runtime': '^7.13.15',
    '@babel/polyfill': '^7.12.1',
    '@babel/preset-env': '^7.13.15',
    '@babel/runtime': '^7.13.10',
    '@rollup/plugin-json': '^4.1.0',
    'babel-eslint': '^10.1.0',
    'babel-loader': '^8.2.2',
    'babel-plugin-istanbul': '^6.0.0',
    chai: '^4.3.4',
    codecov: '^3.8.1',
    'core-js': '^3.11.0',
    eslint: '^7.24.0',
    'eslint-config-prettier': '^8.1.0',
    'eslint-plugin-prettier': '^3.3.1',
    'google-closure-compiler': '^20210505.0.0',
    husky: '^6.0.0',
    karma: '^6.3.2',
    'karma-chai': '^0.1.0',
    'karma-chrome-launcher': '^3.1.0',
    'karma-coverage': '^2.0.3',
    'karma-mocha': '^2.0.1',
    'karma-mocha-reporter': '^2.2.5',
    'karma-webpack': '^5.0.0',
    'lint-staged': '^10.5.4',
    mocha: '^8.3.2',
    prettier: '^2.2.1',
    rollup: '^2.50.1',
    webpack: '^5.31.2',
  };
  var husky = { hooks: { 'pre-commit': 'lint-staged' } };
  var pkg = {
    name: name,
    version: version,
    description: description,
    main: main,
    module: module,
    scripts: scripts,
    repository: repository,
    keywords: keywords,
    author: author,
    license: license,
    bugs: bugs,
    homepage: homepage,
    devDependencies: devDependencies,
    husky: husky,
    'lint-staged': {
      '*.{js,ts,jsx,tsx}': [
        'eslint . --fix',
        'prettier --config .prettierrc --write .',
      ],
    },
  };

  // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie

  /**
   *
   * @param {string} key
   * @returns {string|null}
   */

  function get(key) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    );
  }

  /**
   *
   * @param {string} key
   * @param {any} value
   * @param {string|number|date} end
   * @param {string} path
   * @param {string} domain
   * @param {string} secure
   * @returns {boolean}
   */

  function set(key, value, end, path, domain, secure) {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      return false;
    }
    var expires = '';
    if (end) {
      switch (end.constructor) {
        case Number:
          expires =
            end === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : '; max-age=' + end;
          break;
        case String:
          expires = '; expires=' + end;
          break;
        case Date:
          expires = '; expires=' + end.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(key) +
      '=' +
      encodeURIComponent(value) +
      expires +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '') +
      (secure ? '; secure' : '');
    return true;
  }

  /**
   *
   * @param {string} key
   * @returns {booelan}
   */

  function has(key) {
    return new RegExp(
      '(?:^|;\\s*)' +
        encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
        '\\s*\\='
    ).test(document.cookie);
  }

  /**
   *
   * @param {string} key
   * @param {string} path
   * @param {string} domain
   * @returns {boolean}
   */

  function remove(key, path, domain) {
    if (!key || !has(key)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(key) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '');
    return true;
  }

  /**
   *
   * @returns {array}
   */

  function keys() {
    const keys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (let i = 0; i < keys.length; i++) {
      keys[i] = decodeURIComponent(keys[i]);
    }
    return keys;
  }

  var cookies = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    keys: keys,
    get: get,
    set: set,
    has: has,
    remove: remove,
  });

  /**
   * @description: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
   * @param {element} element https://developer.mozilla.org/zh-CN/docs/Web/API/Element
   * @returns {DOMRect} {left, top, right, bottom, x, y, width, height}, 返回的 DOMRect对象中的属性不是自己的属性。
   * 当使用in 和 for...in 运算符时能成功查找到返回的属性，但使用其他API（例如Object.keys（））查找时将失败。 而且，ES2015和更高版本的功能（如Object.assign（）和对象rest/spread）将无法复制返回的属性。
   */
  function getDOMRect(element) {
    return (
      (element.getBoundingClientRect && element.getBoundingClientRect()) || null
    );
  }

  /**
   * @description 元素相对于网页左上角顶点（0，0）的top和left
   * @param {element} element
   * @returns {object} {x, y}
   */
  function getPosition(element) {
    const { left, top } = getDOMRect(element);
    let dom = document.documentElement || document.body.parentNode;
    const x =
      window.pageXOffset ||
      window.scrollX ||
      (typeof dom.scrollLeft == 'number' ? dom : document.body).scrollLeft;
    const y =
      window.pageYOffset ||
      window.scrollY ||
      (typeof dom.scrollTop == 'number' ? dom : document.body).scrollTop;
    return { x: x + left, y: y + top };
  }

  var element = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getDOMRect: getDOMRect,
    getPosition: getPosition,
  });

  /**
   * @external https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures
   * 数据类型(EMCA latest): 9种
   * 原始类型：undefined, Boolean, String, Number, Bigint, Symbol
   * null, 注意 typeof null === 'object'
   * Object: Object, Array, Function, Map, Set, WeekMap, WeekSet, Date,
   * Function: RegExp
   */

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isNull(value) {
    return value === null;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isString(value) {
    return typeof value === 'string';
  }

  /**
   *
   * @param {*} value
   * @returns {number}
   */
  function isNumber(value) {
    return typeof value === 'number';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isSymbol(value) {
    return typeof value === 'symbol';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isUndefined(value) {
    return value === undefined;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isBoolean(value) {
    return value === true || value === false;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isBigInt(value) {
    return typeof value === 'bigint';
  }

  /**
   * @description
   * @param {*} value
   * @return {boolean}
   */
  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isObject(value) {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isPrototype(value) {
    const objectProto = Object.prototype;
    const constructor = value && value.constructor;
    const proto =
      (isFunction(constructor) && constructor.prototype) || objectProto;
    return value === proto;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isArray(value) {
    return value instanceof Array;
  }

  // 另一种思路是调用toString 去看它是不是 [Object Map]
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isMap(value) {
    return value instanceof Map;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isWeakMap(value) {
    return value instanceof WeakMap;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isSet(value) {
    return value instanceof Set;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isWeakSet(value) {
    return value instanceof WeakSet;
  }

  /**
   * @example `Error`, `EvalError`, `RangeError`, `ReferenceError`,`SyntaxError`, `TypeError`, `URIError`
   * @param {*} value
   * @returns {boolean}
   */
  function isError(value) {
    return [
      Error,
      URIError,
      EvalError,
      TypeError,
      RangeError,
      SyntaxError,
      ReferenceError,
    ].some((item) => {
      return value instanceof item;
    });
  }

  // https://getbootstrap.com/docs/4.1/layout/overview/
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

  /**
   * Extra small devices (portrait phones, less than 576px)
   * @media (max-width: 575.98px) { ... }
   * @returns {boolean}
   */
  function isScreenXS() {
    const { width } = getDOMRect(document.body);
    return width <= 575.98;
  }

  /**
   * Small devices (landscape phones, 576px and up)
   * @media (min-width: 576px) and (max-width: 767.98px) { ... }
   * @returns {boolean}
   */
  function isScreenSM() {
    const { width } = getDOMRect(document.body);
    return width >= 576 && width <= 767.98;
  }

  /**
   * Medium devices (tablets, 768px and up)
   * @media (min-width: 768px) and (max-width: 991.98px) { ... }
   * @returns {boolean}
   */
  function isScreenMD() {
    const { width } = getDOMRect(document.body);
    return width >= 768 && width <= 991.98;
  }

  /**
   * Large devices (desktops, 992px and up)
   * @media (min-width: 992px) and (max-width: 1199.98px) { ... }
   * @returns {boolean}
   */
  function isScreenLG() {
    const { width } = getDOMRect(document.body);
    return width >= 992 && width <= 1199.98;
  }

  /**
   * Extra large devices (large desktops, 1200px and up)
   * @media (min-width: 1200px) { ... }
   * @returns {boolean}
   */
  function isScreenXL() {
    const { width } = getDOMRect(document.body);
    return width >= 1200;
  }

  /**
   *
   * @param {*} value
   * @returns
   */
  function isEmpty(value) {
    // null 0 '' false undefined
    if (!value) {
      return true;
    }
    if (isArray(value)) {
      return !value.length;
    } else if (isObject(value)) {
      return !Object.keys(value).length;
    } else if (
      isMap(value) ||
      isWeakMap(value) ||
      isSet(value) ||
      isWeakSet(value)
    ) {
      return !value.size;
    }
    return false;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isDate(value) {
    return value instanceof Date;
  }

  var judge = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    isNull: isNull,
    isString: isString,
    isNumber: isNumber,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isBigInt: isBigInt,
    isFunction: isFunction,
    isArray: isArray,
    isObject: isObject,
    isPrototype: isPrototype,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    isError: isError,
    isScreenXS: isScreenXS,
    isScreenSM: isScreenSM,
    isScreenMD: isScreenMD,
    isScreenLG: isScreenLG,
    isScreenXL: isScreenXL,
    isEmpty: isEmpty,
    isDate: isDate,
  });

  /**
   *
   * @returns {string} length 10 or 11
   */
  function randomSimple() {
    return Math.random().toString(32).substr(2);
  }

  var generator = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    randomSimple: randomSimple,
  });

  /**
   * @external https://console.spec.whatwg.org/
   * @param {*} name
   * @param {function} cb
   */
  async function timing(name = 'test', cb) {
    console.time(name);
    typeof cb === 'function' && (await cb());
    console.timeEnd(name);
  }

  async function timeConsuming(cb) {
    const start = window.performance.now();
    typeof cb === 'function' && (await cb());
    const end = window.performance.now();
    const res = (end - start).toFixed(2);
    console.log(`time-consuming: ${res} ms`);
  }

  var logger = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    timing: timing,
    timeConsuming: timeConsuming,
  });

  /**
   *
   * @param {string} url
   * @returns {object}
   */
  function getQueryParameters(url) {
    const paramStr = decodeURIComponent(url).split('?')[1];
    if (!paramStr) {
      return {};
    }
    const paramArr = paramStr.split('&');
    const res = {};
    paramArr.forEach((param) => {
      const [key, value] = param.split('=');
      res[key] = value;
    });
    return res;
  }

  /**
   *
   * @param {string} url
   * @returns {object}
   */
  function getQueryParametersByRegExp(url) {
    const parameters = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      parameters[key] = value;
    });
    return parameters;
  }

  /**
   * @external  https://www.regex-tutorial.com/urlParameter.html
   * @param {string} url
   * @param {string} name
   * @returns {string}
   */
  function getQueryParameterByRegExp(url, name) {
    const reg = new RegExp('[?&]' + name + '=([^&]+).*$');
    const res = url.match(reg);
    return res === null ? '' : decodeURIComponent(res[1].replace(/\+/g, ' '));
  }

  var url = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getQueryParameterByRegExp: getQueryParameterByRegExp,
    getQueryParametersByRegExp: getQueryParametersByRegExp,
    getQueryParameters: getQueryParameters,
  });

  /**
   *
   * @returns {string}
   */

  function getVersion() {
    return pkg.version;
  }

  exports.cookies = cookies;
  exports.element = element;
  exports.generator = generator;
  exports.getVersion = getVersion;
  exports.judge = judge;
  exports.logger = logger;
  exports.url = url;

  Object.defineProperty(exports, '__esModule', { value: true });
});
