/**
 * 产生随机色
 * @returns hex color, eg: `#ffffff`
 */
const randomColorHex = (): string => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};

export default randomColorHex;
