import { isArray } from '../types/index';
import decimal from '../decimal';

/**
 * 生成随机指定位数的小数或数组中随机选择一个元素。
 * @param min - 如果是数字，则表示随机数的下限；如果是数组，则从中随机选取一个元素；如果没有第二个参数，则表示上限，下限为 0。
 * @param max - 可选，当不传入时，第一个参数表示上限，下限为 `0`；当第一个参数为数字时，表示随机数的上限。
 * @param precision 小数位数
 * @returns 如果 `min` 是数组，则返回该数组中的一个随机元素；
 *          如果 `min` 是数字且 `max` 提供，则返回 `[min, max]` 范围内的随机整数。
 */
function random<T>(min: number | T[], max?: number, precision: number = 0): number | T {
  if (isArray(min)) return (min as [])[random((min as []).length - 1) as number];
  if (max === void 0 || max === null) return random(0, min as number);
  return decimal(Math.random() * (max - (min as number)) + (min as number), precision);
}

export default random;
