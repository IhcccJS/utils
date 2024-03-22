import { isArray } from '../types/index';

/**
 * 从指定范围或数组中随机选择一个元素。
 * @param min - 如果是数字，则表示随机数的下限；如果是数组，则从中随机选取一个元素。
 * @param max - 可选，仅当 `min` 为数字时有效，表示随机数的上限。
 * @returns 如果 `min` 是数组，则返回该数组中的一个随机元素；
 *          如果 `min` 是数字且 `max` 提供，则返回 `[min, max]` 范围内的随机整数。
 */
function random<T>(min: number | T[], max?: number): number | T {
  // @ts-ignore
  if (isArray(min)) return min[random(min.length)];
  if (max === void 0) return random(0, min as number);
  return Math.floor(Math.random() * (max - (min as number))) + (min as number);
}

export default random;
