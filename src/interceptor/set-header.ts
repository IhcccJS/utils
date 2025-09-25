import { isFunction } from '../types/index';
import { TSetHeaderOptions } from './index.d';

/**
 * 设置请求头数据方法的拦截器
 * @returns
 */
const setHeaders = (url: string, options: TSetHeaderOptions) => {
  const { withHeader = true, ...restOptions } = options;

  if (withHeader && isFunction(restOptions.getHeaders)) {
    restOptions.headers = Object.assign(restOptions.getHeaders(url, options), restOptions.headers);
  }

  return { url, options: restOptions };
};

export default setHeaders;
