import CryptoJS from 'crypto-js';
import { isString } from '../types/index';

/**
 * 保存字符串数据到本地
 * @param {string} key - 键
 * @param {any} value - 值
 */
const setStorage = (key: string, value: any, secret?: string) => {
  let val = value;
  if (!isString(val) && val !== undefined) {
    val = JSON.stringify(val);
  }

  if (secret) {
    val = CryptoJS.AES.encrypt(val, secret).toString();
  }

  return window.localStorage.setItem(key, val);
};

export default setStorage;
