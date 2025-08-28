/**
 * 删除对象匹配的数据
 * @param {any} data 表单数据
 * @param {object} filter 过滤方法
 * @returns {object}
 */
const omitData = (data: any, filter: (key: string, value: any) => boolean): Record<string, any> => {
  return Object.keys(data || {}).reduce((store: Record<string, any>, key) => {
    if (filter(key, data[key])) store[key] = data[key];
    return store;
  }, {});
};

export default omitData;
