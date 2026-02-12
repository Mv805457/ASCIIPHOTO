function brightness(r, g, b) {
  return 0.299*r + 0.587*g + 0.114*b;
}

function getChar(bright, chars) {
  const index = Math.floor((bright / 255) * (chars.length - 1));
  return chars[index];
}
