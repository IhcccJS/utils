import { isFunction } from '../types/index';
import { TOptions, TPaths, TTransformed } from "./index.d";

/**
 * 获取完整请求服务地址的拦截器
 * @param {object} paths
 * @param {function} transform
 * @returns
 */
function getServerPath(paths: TPaths, transform: Function) {
  paths = paths || {};
  const needTransform = isFunction(transform);
  const transformed: TTransformed = {};

  return function (url: string, options: TOptions) {
    const { urlParams, asPath } = options || {};
    let urlArray: string[] = [];
    let params = '';

    if (urlParams > 0 && Boolean(url?.match(/\//))) {
      urlArray = url.split('/');
      params = '/' + urlArray.splice(-urlParams).join('/');
    } else if (Boolean(url?.match(/\?/))) {
      urlArray = url.split('?');
      params = `?${urlArray.splice(-1) || ''}`;
    }

    const api = urlArray.join('/') || url || '';
    if (transformed.hasOwnProperty(api) === false) {
      let newUrl = needTransform ? transform(api) : api;
      let defaultPath = paths.default || '';

      for (let serverPath in paths) {
        if (serverPath === 'default') continue;
        const searchUrl = !asPath ? newUrl : asPath + newUrl;
        if (
          paths[serverPath].some((prefix) => searchUrl.indexOf(prefix) === 0)
        ) {
          defaultPath = (paths[serverPath] as any).includes(serverPath)
            ? ''
            : serverPath;
          break;
        }
      }

      transformed[api] = defaultPath + newUrl;
    }

    return { url: `${transformed[api]}${params}`, options };
  };
}

export default getServerPath;
