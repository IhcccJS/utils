import { isFunction } from '@ihccc/utils';

const request = async function (config: any) {
  try {
    if (isFunction(config.fakeApi)) {
      config.fakeData = await config.fakeApi(config.params || config.data);
    }
  } catch (error) {
    console.error(error);
  }
  return config;
};

const response = function (response: any) {
  if (!!response.config.fakeData) {
    response.data = response.config.fakeData;
    delete response.config.fakeData;
  }

  return response;
};

export default { request, response };
