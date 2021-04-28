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

export { timing };
