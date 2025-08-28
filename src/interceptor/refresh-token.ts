import delay from '../delay';

type TResponseOption = {
  instance: any;
  refresh: () => Promise<any>;
  onRefresh: (response: any) => boolean;
  onSuccess?: () => {};
  onFail?: () => {};
};

let refreshPromise: Promise<boolean> | null;
async function refreshToken(refresh: () => Promise<any>, onRefresh: any) {
  if (!refreshPromise) {
    refreshPromise = new Promise((resolve) => {
      refresh().then((result) => {
        const isSuccess = onRefresh(result);
        resolve(isSuccess);
        refreshPromise = null;
      });
    });
  }
  return refreshPromise;
}

const response = (option: TResponseOption) => {
  const { instance, refresh, onRefresh, onSuccess, onFail } = option || {};

  let timer: NodeJS.Timeout | undefined;
  let req_count = 0;

  const reponseHandler = async function (response: any) {
    if (response.status === 401) {
      const success = await refreshToken(refresh, onRefresh);

      if (success) {
        onSuccess?.();
      } else {
        onFail?.();
      }
    }

    return response;
  };

  const errorHandler = async function (error: any) {
    if (!!error.response && error.response.status === 401 && req_count < 2) {
      req_count++;

      clearTimeout(timer);
      timer = setTimeout(() => {
        req_count = 0;
      }, 5000);

      const success = await refreshToken(refresh, onRefresh);

      if (success) {
        onSuccess?.();
        await delay(2000);
        error.config.headers = error.config.getHeaders();
        const data = await instance(error.config.url, {
          ...error.config,
          requestInterceptors: void 0,
          responseInterceptors: void 0,
        });

        error.response.data = data;
        error.response.status = 200;
        error.response.statusText = 'OK';

        return error.response;
      } else {
        onFail?.();
      }
    }

    return error;
  };

  return [reponseHandler, errorHandler];
};

export default { request: null, response };
