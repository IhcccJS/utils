import CryptoJS from 'crypto-js';
import { isString } from '../types/index';

/**
 * 获取转换后的本地缓存，如果不存在，返回默认值
 * @param {string} key - 本地缓存的键值
 * @param {any} defaultValue - 默认值
 * @param {string} secret - 加密密钥
 */
const getStorage = (key: string, defaultValue: any = '', secret?: string): any => {
  let storage = window.localStorage.getItem(key);

  if (!!secret && storage !== null) {
    var bytes = CryptoJS.AES.decrypt(storage as string, secret);
    storage = bytes.toString(CryptoJS.enc.Utf8);
  }

  if (!storage) return defaultValue;
  try {
    return JSON.parse(storage as string);
  } catch (e) {
    return isString(defaultValue) ? storage : defaultValue;
  }
};

export default getStorage;
