'use strict';

/**
 * @description: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
 * @param {element} element https://developer.mozilla.org/zh-CN/docs/Web/API/Element
 * @returns {DOMRect} {left, top, right, bottom, x, y, width, height}, 返回的 DOMRect对象中的属性不是自己的属性。
 * 当使用in 和 for...in 运算符时能成功查找到返回的属性，但使用其他API（例如Object.keys（））查找时将失败。 而且，ES2015和更高版本的功能（如Object.assign（）和对象rest/spread）将无法复制返回的属性。
 */
function getDOMRect(element) {
  return (
    (element.getBoundingClientRect && element.getBoundingClientRect()) || null
  );
}

/**
 * @description 元素相对于网页左上角顶点（0，0）的top和left
 * @param {element} element
 * @returns {object} {x, y}
 */
function getPosition(element) {
  const { left, top } = getDOMRect(element);
  let dom = document.documentElement || document.body.parentNode;
  const x =
    window.pageXOffset ||
    window.scrollX ||
    (typeof dom.scrollLeft == 'number' ? dom : document.body).scrollLeft;
  const y =
    window.pageYOffset ||
    window.scrollY ||
    (typeof dom.scrollTop == 'number' ? dom : document.body).scrollTop;
  return { x: x + left, y: y + top };
}

function copyToBoard(value) {
  const element = document.createElement('textarea');
  document.body.appendChild(element);
  element.value = value;
  element.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    document.body.removeChild(element);
    return true;
  }
  document.body.removeChild(element);
  return false;
}

function scrollToTop() {
  // window.scrollTo({
  //   left: 0,
  //   top: 0,
  //   behavior: 'smooth',
  // });
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

function scroll2Top() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    window.requestAnimationFrame(scroll2Top);
    window.scrollTo(0, scrollTop - scrollTop / 8);
  }
}

const removeHtmltag = (str) => {
  return str.replace(/<[^>]+>/g, '');
};

const injectScript = (src) => {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = src;
  const t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
};

const download = (url) => {
  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  if (isChrome || isSafari) {
    var link = document.createElement('a');
    link.href = url;
    if (link.download !== undefined) {
      var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }
    if (document.createEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  window.open(url, '_self');
  return true;
};

const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
};

const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
};

const removeClass = (el, className) => {
  if (!hasClass(el, className)) {
    return;
  }
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
  el.className = el.className.replace(reg, ' ');
};

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const copyTextToClipboard = (value) => {
  var textArea = document.createElement('textarea');
  textArea.style.background = 'transparent';
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
};

const appendQuery = (url, key, value) => {
  var options = key;
  if (typeof options == 'string') {
    options = {};
    options[key] = value;
  }
  options = $.param(options);
  if (url.includes('?')) {
    url += '&' + options;
  } else {
    url += '?' + options;
  }
  return url;
};

export {
  getDOMRect,
  getPosition,
  copyToBoard,
  scroll2Top,
  scrollToTop,
  removeHtmltag,
  injectScript,
  download,
  hasClass,
  addClass,
  removeClass,
  getScrollPosition,
  elementIsVisibleInViewport,
  copyTextToClipboard,
  appendQuery,
};
