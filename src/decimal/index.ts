/**
 * 取小数位数
 * @param {number} num 数字
 * @param {number} precision 小数位数
 * @returns
 */
const decimal = (num: number, precision: number = -1) => {
  if (precision > -1) {
    const pre = 10 ** precision;
    num = Math.round(num * pre) / pre;
  }
  return num;
}

export default decimal;
