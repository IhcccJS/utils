/**
 * 数字前补零
 * @param {string} val - 数字
 */
const toFixed = (val: number): number | string => {
  return +val < 10 ? `0${val}` : val;
};

export default toFixed;
