'use strict';

/**
 * @external https://console.spec.whatwg.org/
 * @param {function} fn
 */
function timeConsuming(fn) {
  const name = Math.random().toString(32).substr(2);
  console.time(name);
  fn.apply(this, [...arguments].slice(1));
  console.timeEnd(name);
}

export { timeConsuming };
