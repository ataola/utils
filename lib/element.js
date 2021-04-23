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

export { getDOMRect, getPosition };
