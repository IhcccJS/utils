import get from 'lodash/get';
import decimal from '../decimal/index';

/**
 * 比列计算
 *
 * @param {object} data 数据来源对象
 * @param {string} a 分子
 * @param {string} b 分母
 * @returns
 */
interface TObject {
  [key: string]: string | number;
}

function ratio (
  data: TObject,
  a: number | string,
  b: number | string,
): string {
  a = get(data, a, 0);
  b = get(data, b, 1);
  a = +a;
  b = +b;
  const res = decimal((a / b) * 100, 2);
  return isNaN(res) ? '0' : `${res}`;
}

export default ratio;
