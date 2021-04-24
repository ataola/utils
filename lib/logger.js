'use strict';
import { randomSimple } from './generator';

/**
 * @external https://console.spec.whatwg.org/
 * @param {function} fn
 */
function timeConsumingSync(fn) {
  const random = randomSimple();
  const name = `${random}-time-cost`;
  console.time(name);
  fn.apply(this, [...arguments].slice(1));
  console.timeEnd(name);
}

export { timeConsumingSync };
