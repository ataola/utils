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

export { deepFreeZe, cloneDeep };
