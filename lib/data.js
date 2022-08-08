'use strict';

/**
 * @external https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @param {*} obj
 * @returns
 */

function deepFreeZe(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach((name) => {
    const prop = obj[name];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeZe(prop);
    }
  });
  return Object.freeze(obj);
}

function cloneDeep(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }

  const newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? cloneDeep(obj[key]) : obj[key];
    }
  }
  return newObj;
}

const shuffle = (arr) => {
  var result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
};

const contains = (arr, val) => {
  return arr.indexOf(val) != -1 ? true : false;
};

const sort = (arr, type = 1) => {
  return arr.sort((a, b) => {
    switch (type) {
      case 1:
        return a - b;
      case 2:
        return b - a;
      case 3:
        return Math.random() - 0.5;
      default:
        return arr;
    }
  });
};

const unique = (arr) => {
  if (Array.hasOwnProperty('from')) {
    return Array.from(new Set(arr));
  } else {
    var n = {},
      r = [];
    for (var i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }
    return r;
  }
};

const max = (arr) => {
  return Math.max.apply(null, arr);
};

const min = (arr) => {
  return Math.min.apply(null, arr);
};

const sum = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre + cur;
  });
};

const average = (arr) => {
  return sum(arr) / arr.length;
};

const trim = (str, type) => {
  type = type || 1;
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s*)/g, '');
    case 4:
      return str.replace(/(\s*$)/g, '');
    default:
      return str;
  }
};

// type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
const changeCase = (str, type) => {
  type = type || 4;
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      });
    case 2:
      return str.replace(/\b\w+\b/g, function (word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      });
    case 3:
      return str
        .split('')
        .map(function (word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          } else {
            return word.toLowerCase();
          }
        })
        .join('');
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
};

const checkPwd = (str) => {
  var Lv = 0;
  if (str.length < 6) {
    return Lv;
  }
  if (/[0-9]/.test(str)) {
    Lv++;
  }
  if (/[a-z]/.test(str)) {
    Lv++;
  }
  if (/[A-Z]/.test(str)) {
    Lv++;
  }
  if (/[\.|-|_]/.test(str)) {
    Lv++;
  }
  return Lv;
};

export {
  deepFreeZe,
  cloneDeep,
  shuffle,
  contains,
  sort,
  unique,
  max,
  min,
  sum,
  average,
  trim,
  changeCase,
  checkPwd,
};
