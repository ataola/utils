function getExt(filename) {
  if (typeof filename == 'string') {
    return filename.split('.').pop().toLowerCase();
  } else {
    throw new Error('filename must be a string type');
  }
}

const bytesToSize = (bytes, decimal = 2) => {
  if (0 == bytes) return '0 Bytes';
  const Binary = 1024;
  const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(Binary));
  return `${parseFloat(
    (bytes / Math.pow(Binary, unitIndex)).toFixed(decimal)
  )} ${UNITS[unitIndex]}`;
};

export { getExt, bytesToSize };
