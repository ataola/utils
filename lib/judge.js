'use strict';
import { getDOMRect } from './element';

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
  // return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
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

// 一般电脑没有触摸接触点数，而电脑模拟的移动设备也只有一个，而真实的移动设备却是 3-4个，以此来判断是否是真实的移动设备。
const isDeviceMobile = () =>
  //  return /android|webos|iphone|ipod|balckberry/i.test(navigator.userAgent)
  navigator.platform.indexOf('Mac') === navigator.platform.indexOf('Win') &&
  navigator.maxTouchPoints &&
  2 < navigator.maxTouchPoints;

const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};

const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};

const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s);
};

const isRegExp = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp';
};

const isPromise = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Promise';
};

const isWeiXin = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.match(/microMessenger/i) == 'micromessenger';
};

const isQQBrowser = () => {
  return !!navigator.userAgent.match(
    /mqqbrowser|qzone|qqbrowser|qbwebviewtype/i
  );
};

const isSpider = () => {
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(
    navigator.userAgent
  );
};

const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    //安卓手机
    return false;
  } else if (u.indexOf('iPhone') > -1) {
    //苹果手机
    return true;
  } else if (u.indexOf('iPad') > -1) {
    //iPad
    return false;
  } else if (u.indexOf('Windows Phone') > -1) {
    //winphone手机
    return false;
  } else {
    return false;
  }
};

const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

const checkStr = (str, type) => {
  switch (type) {
    case 'phone': //手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card': //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    case 'postal': //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'QQ': //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL': //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
        str
      );
    case 'IP': //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
        str
      );
    case 'date': //日期时间
      return (
        /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
          str
        ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      );
    case 'number': //数字
      return /^[0-9]$/.test(str);
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese': //中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case 'lower': //小写
      return /^[a-z]+$/.test(str);
    case 'upper': //大写
      return /^[A-Z]+$/.test(str);
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
};

const isCardID = (sId) => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log('你输入的身份证长度或格式错误');
    return false;
  }
  //身份证城市
  var aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };
  if (!aCity[parseInt(sId.substr(0, 2))]) {
    console.log('你的身份证地区非法');
    return false;
  }

  // 出生日期验证
  var sBirthday = (
      sId.substr(6, 4) +
      '-' +
      Number(sId.substr(10, 2)) +
      '-' +
      Number(sId.substr(12, 2))
    ).replace(/-/g, '/'),
    d = new Date(sBirthday);
  if (
    sBirthday !=
    d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
  ) {
    console.log('身份证上的出生日期非法');
    return false;
  }

  // 身份证号码校验
  var sum = 0,
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    codes = '10X98765432';
  for (var i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i];
  }
  var last = codes[sum % 11]; //计算出来的最后一位身份证号码
  if (sId[sId.length - 1] != last) {
    console.log('你输入的身份证号非法');
    return false;
  }

  return true;
};

const isObjectEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
};

export {
  isNull,
  isString,
  isNumber,
  isSymbol,
  isUndefined,
  isBoolean,
  isBigInt,
  isFunction,
  isArray,
  isObject,
  isPrototype,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isError,
  isScreenXS,
  isScreenSM,
  isScreenMD,
  isScreenLG,
  isScreenXL,
  isEmpty,
  isDate,
  isDeviceMobile,
  isEmail,
  isMobile,
  isPhone,
  isURL,
  isRegExp,
  isPromise,
  isWeiXin,
  isQQBrowser,
  isSpider,
  isIos,
  isPC,
  checkStr,
  isCardID,
  isObjectEqual,
};
