'use strict';
/**
 * @external https://segmentfault.com/a/1190000012769779
 * @param {Function} fn
 * @param  {...any} args
 * @returns {any}
 */
function curry(fn, ...args) {
  return fn.length > args.length
    ? (...args2) => curry(fn, ...args, ...args2)
    : fn(...args);
}

/**
 *
 * @param {Function} fn
 * @param {number} time
 * @param {number} interval
 */
const debouncer = (fn, time, interval = 200) => {
  if (time - (window.debounceTimestamp || 0) > interval) {
    fn && fn();
    window.debounceTimestamp = time;
  }
};

export { curry, debouncer };
