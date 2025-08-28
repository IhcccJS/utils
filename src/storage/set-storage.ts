import CryptoJS from 'crypto-js';
import { isString } from '../types/index';

/**
 * 保存数据到本地，如果不是字符串，将自动转为字符串
 * @param {string} key - 本地缓存的键值
 * @param {any} value - 数据
 * @param {string} secret - 加密密钥
 */
const setStorage = (key: string, value: any, secret?: string): void => {
  let val = value;
  if (!isString(val) && val !== undefined) {
    val = JSON.stringify(val);
  }

  if (!!secret) {
    val = CryptoJS.AES.encrypt(val, secret).toString();
  }

  return window.localStorage.setItem(key, val);
};

export default setStorage;
