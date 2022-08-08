function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatTime(time) {
  if (!time) {
    return '';
  }
  let oldTimestamp = time;

  if ('string' === typeof time) {
    oldTimestamp =
      new Date(time).getTime() || new Date(time.replace(/-/g, '/')).getTime();
  }

  var todayStartTimestamp = new Date(new Date().toLocaleDateString()).getTime();
  const differTimestamp = Date.now() - oldTimestamp;

  if (differTimestamp < 6e4) {
    return '刚刚';
  }

  if (differTimestamp < 36e5) {
    return Math.floor(differTimestamp / 6e4) + '分钟前';
  }

  if (differTimestamp < 864e5) {
    return oldTimestamp >= todayStartTimestamp
      ? Math.floor(differTimestamp / 36e5) + '小时前'
      : '昨天';
  }

  if (differTimestamp < 1728e5) {
    return oldTimestamp >= todayStartTimestamp - 864e5 ? '昨天' : '前天';
  }

  if (
    differTimestamp < 2592e5 &&
    oldTimestamp >= todayStartTimestamp - 1728e5
  ) {
    return '前天';
  }

  const oldTime = new Date(oldTimestamp);
  const oldYear = oldTime.getFullYear();
  let oldTimeStr = `${oldTime.getMonth() + 1}.${oldTime.getDate()}`;

  if (new Date().getFullYear() !== oldYear) {
    oldTimeStr = `${oldYear}.${oldTimeStr}`;
  }
  return oldTimeStr;
}

export { sleep, formatTime };
