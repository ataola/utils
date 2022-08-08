'use strict';
import { DIGITS, ALPHABET } from './constant';

/**
 *
 * @returns {string} length 10 or 11
 */
function randomSimple() {
  return Math.random().toString(32).substr(2);
}

function randomWord(length, chars) {
  const len = length || 8;
  let result = '';
  let str = chars || `${DIGITS}${ALPHABET}`;

  for (var i = len; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)];
  }

  return result;
}

function getUUID() {
  const url = URL.createObjectURL(new Blob([]));
  const uuid = url.substring(url.lastIndexOf('/') + 1);
  URL.revokeObjectURL(url);
  return uuid;
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const random = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export { randomSimple, randomWord, getUUID, uuidv4, random };
