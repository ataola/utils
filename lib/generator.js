'use strict';

function randomSimple() {
  return Math.random().toString(32).substr(2);
}

export { randomSimple };
