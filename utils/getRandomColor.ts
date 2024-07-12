export const randomColor = () =>
  "#" + ((Math.random() * 0x1000000) | 0x1000000).toString(16).slice(1);
