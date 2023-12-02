/**
 * 删除对象内无效的数据，eg: 空、undefined、null
 * @param {object} data 表单数据
 * @returns {object}
 */
const omitFormData = (data: any): object => {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    let formData: any = {};
    for (let name in data) {
      if (data[name] === '' || data[name] === null || data[name] === void 0) {
        continue;
      }
      formData[name] = data[name];
    }
    return formData;
  }
  return {};
};

export default omitFormData;
