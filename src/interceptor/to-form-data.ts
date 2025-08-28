import { isObject } from '../types/index';
import { TToFormData } from './index.d';

type TOption = { defaultFormData: boolean };

/**
 * 将普通 Object 数据转换成 FormData 数据
 * @param {object} data 表单数据
 * @returns {FormData}
 */
export function transformData(data: any): FormData {
  if (isObject(data)) {
    let formData = new FormData();
    for (let name in data) {
      if (data[name] !== undefined || data[name] !== null) {
        formData.append(name, data[name]);
      }
    }
    return formData;
  }
  return new FormData();
}

/**
 * 转换数据格式的拦截器
 * @param {string} url 地址
 * @param {object} options 如果配置内 formData 字段为 true 就会转换 data 参数为 FormData 格式
 * @returns
 */
const toFormData = function (option: TOption) {
  const { defaultFormData } = option;

  return (url: string, options: TToFormData) => {
    const { formData = defaultFormData, ...restOptions } = options;
    if (formData && restOptions.data) {
      restOptions.data = transformData(restOptions.data);
    }

    return { url, options: restOptions };
  };
};

export default toFormData;
