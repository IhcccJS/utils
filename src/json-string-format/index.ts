/**
 * 将字符串转成json对象
 * @param {string} data 字符串
 */
const jsonStringFormat = (data: string) => {
  if (/^\{.*\}$/.test(data)) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export default jsonStringFormat;
