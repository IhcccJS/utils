/**
 * 判断数据类型
 * @param {string} type
 * @returns
 */
export function types(type: string) {
  return function (target: any) {
    return Object.prototype.toString.call(target) === `[object ${type}]`;
  };
}

/**
 * 是否是 null
 */
export const isNull = types('Null');

/**
 * 是否是 Undefined 类型
 */
export const isUndefined = types('Undefined');

/**
 * 是否是 Boolean 类型
 */
export const isBoolean = types('Boolean');

/**
 * 是否是 Number 类型
 */
export const isNumber = types('Number');

/**
 * 是否是 String 类型
 */
export const isString = types('String');

/**
 * 是否是 Array 类型
 */
export const isArray = types('Array');

/**
 * 是否是 Object 类型
 */
export const isObject = types('Object');

/**
 * 是否是 Function 类型
 */
export const isFunction = types('Function');

/**
 * 是否是 Symbol 类型
 */
export const isSymbol = types('Symbol');

export default types;
