/**
 * 产生随机色
 * @returns color
 */
const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
};

export default randomColor;
