'use strict';
/**
 * @external https://segmentfault.com/a/1190000012769779
 * @param {function} fn
 * @param  {...any} args
 * @returns { any }
 */
function curry(fn, ...args) {
  return fn.length > args.length
    ? (...args2) => curry(fn, ...args, ...args2)
    : fn(...args);
}

export { curry };
