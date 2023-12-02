import { isString, isArray, isFunction } from '../types/index';

type filterFn = (name: string) => boolean;

/**
 * 删除指定key值的缓存
 * @param {string|array|null|undefined} keys - 本地缓存的键值名称，传字符串删除单个，传字符串数组删多个，不传删全部
 * @param {boolean} includes - 删除项是否在 `keys` 内，或者使用一个返回 `true` 的方法，检查是否应该删除
 */
const removeStorage = (keys: string | string[] | null | undefined, includes: filterFn | boolean = true) => {
  if (isString(keys)) {
    window.localStorage.removeItem(keys as string);
  } else if (isArray(keys)) {
    if (includes === true) {
      (keys as string[]).forEach((key) => {
        window.localStorage.removeItem(key);
      });
    } else if (includes === false) {
      Object.keys(window.localStorage).forEach((key) => {
        if (!(keys as any).includes(key)) window.localStorage.removeItem(key);
      });
    } else if(isFunction(includes)) {
      (keys as string[]).forEach((key) => {
        if (includes(key)) window.localStorage.removeItem(key);
      });
    }
  } else if(isFunction(includes)) {
    Object.keys(window.localStorage).forEach((key) => {
      if ((includes as Function)(key)) window.localStorage.removeItem(key);
    });
  } else {
    window.localStorage.clear();
  }
};

export default removeStorage;
