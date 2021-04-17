'use strict';
// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie

/**
 *
 * @param {string} key
 * @returns {string|null}
 */

function getItem(key) {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'
        ),
        '$1'
      )
    ) || null
  );
}

/**
 *
 * @param {string} key
 * @param {any} value
 * @param {string|number|date} end
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 * @returns {boolean}
 */

function setItem(key, value, end, path, domain, secure) {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return false;
  }
  var expires = '';
  if (end) {
    switch (end.constructor) {
      case Number:
        expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
        break;
      case String:
        expires = '; expires=' + end;
        break;
      case Date:
        expires = '; expires=' + end.toUTCString();
        break;
    }
  }
  document.cookie =
    encodeURIComponent(key) +
    '=' +
    encodeURIComponent(value) +
    expires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '');
  return true;
}

/**
 *
 * @param {string} key
 * @returns {booelan}
 */

function hasItem(key) {
  return new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=').test(
    document.cookie
  );
}

/**
 *
 * @param {string} key
 * @param {string} path
 * @param {string} domain
 * @returns {boolean}
 */

function removeItem(key, path, domain) {
  if (!key || !hasItem(key)) {
    return false;
  }
  document.cookie =
    encodeURIComponent(key) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '');
  return true;
}

/**
 *
 * @returns {array}
 */

function keys() {
  const keys = document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:\=[^;]*)?;\s*/);
  for (let i = 0; i < keys.length; i++) {
    keys[i] = decodeURIComponent(keys[i]);
  }
  return keys;
}

export { keys, getItem, setItem, hasItem, removeItem };
