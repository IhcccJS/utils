import random from '../random/index';

/**
 * 产生随机色
 * @returns rgb color, eg: `rgb(255, 255, 255)`
 */
const randomColorRgb = () => {
  return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
};

export default randomColorRgb;
