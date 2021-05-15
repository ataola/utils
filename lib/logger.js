'use strict';

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

export { timing, timeConsuming };
