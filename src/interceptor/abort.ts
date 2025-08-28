/**
 * 全局401中断请求拦截器
 */
const abortInterceptor: {
  __controller__: null | AbortController;
  request: any;
  response: any;
} = {
  __controller__: null,
  request: (url: string, config: any) => {
    const { abortEnable, ...options } = config;
    if (abortEnable === false) return { url, options };
    let controller = abortInterceptor.__controller__;
    if (!controller) {
      controller = new AbortController();
      abortInterceptor.__controller__ = controller;
    }
    return { url, options: { ...options, signal: controller.signal } };
  },
  response: (response: any, options: any) => {
    let controller = abortInterceptor.__controller__;
    if (!controller) return response;
    if (response.status === 401 && options.aborted !== false) {
      controller.abort();
      abortInterceptor.__controller__ = null;
    }
    return response;
  },
};

export default abortInterceptor;
