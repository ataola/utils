function utf82Base64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function base642Utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export { utf82Base64, base642Utf8 };
