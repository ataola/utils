'use strict';

/**
 *
 * @returns {string} length 10 or 11
 */
function randomSimple() {
  return Math.random().toString(32).substr(2);
}

export { randomSimple };
