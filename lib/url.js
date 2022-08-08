'use strict';

/**
 *
 * @param {string} url
 * @returns {object}
 */
function getQueryParameters(url) {
  const paramStr = decodeURIComponent(url).split('?')[1];
  if (!paramStr) {
    return {};
  }
  const paramArr = paramStr.split('&');
  const res = {};
  paramArr.forEach((param) => {
    const [key, value] = param.split('=');
    res[key] = value;
  });
  return res;
}

/**
 *
 * @param {string} url
 * @returns {object}
 */
function getQueryParametersByRegExp(url) {
  const parameters = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    parameters[key] = value;
  });
  return parameters;
}

/**
 * @external  https://www.regex-tutorial.com/urlParameter.html
 * @param {string} url
 * @param {string} name
 * @returns {string}
 */
function getQueryParameterByRegExp(url, name) {
  const reg = new RegExp('[?&]' + name + '=([^&]+).*$');
  const res = url.match(reg);
  return res === null ? '' : decodeURIComponent(res[1].replace(/\+/g, ' '));
}

/**
 *
 * @param {string} href
 * @returns {string}
 */
function realative2Abs(href) {
  let aEl = document.createElement('a');
  aEl.href = href;
  const result = aEl.href;
  aEl = null;
  return result;
}

export {
  getQueryParameterByRegExp,
  getQueryParametersByRegExp,
  getQueryParameters,
  realative2Abs,
};
