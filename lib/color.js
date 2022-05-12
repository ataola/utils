function toHEX(rgb) {
  return ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
    .toString(16)
    .substr(1);
}

export { toHEX };
