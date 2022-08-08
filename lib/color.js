function toHEX(rgb) {
  return ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
    .toString(16)
    .substr(1);
}

function getRandomColor() {
  let rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}

const colorToRGB = (val, opa) => {
  var pattern = /^(#?)[a-fA-F0-9]{6}$/; // 16进制颜色值校验规则
  var isOpa = typeof opa == 'number'; // 判断是否有设置不透明度

  if (!pattern.test(val)) {
    // 如果值不符合规则返回空字符
    return '';
  }

  var v = val.replace(/#/, ''); // 如果有#号先去除#号
  var rgbArr = [];
  var rgbStr = '';

  for (var i = 0; i < 3; i++) {
    var item = v.substring(i * 2, i * 2 + 2);
    var num = parseInt(item, 16);
    rgbArr.push(num);
  }

  rgbStr = rgbArr.join();
  rgbStr =
    'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
  return rgbStr;
};

export { toHEX, getRandomColor, colorToRGB };
