/**
 * 取小数位数
 * @param {number} num 数值
 * @param {number} precision 小数位数，小于 `0` 不处理
 * @returns
 */
const decimal = (num: number, precision: number = -1) => {
  if (!/^-?\d+.?\d+$/.test(num as unknown as string)) num = 0;
  num = +num;
  if (precision > -1) {
    const pre = 10 ** precision;
    num = Math.round(num * pre) / pre;
  }
  return num;
};

export default decimal;
