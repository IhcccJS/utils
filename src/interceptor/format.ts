import dataFormat from '../data-format';

const request = function (config: any) {
  try {
    if (Array.isArray(config.formatIn)) {
      const format = dataFormat(config.formatIn);
      if (!!config.params) config.params = format(config.params);
      if (!!config.data) config.data = format(config.data);
    }
  } catch (error) {
    console.error(error);
  }
  return config;
};

const response = function (option: any = {}) {
  const reqTypes = option.reqTypes || {};

  const reponseHandler = function (response: any) {
    const type = response.config.reqType;

    const resHanlder = typeof type === 'function' ? type : reqTypes[type];

    if (typeof resHanlder === 'function') {
      const { data, pass, onFormat, message } = resHanlder(response.data || {}, response.config);

      if (!!message) option.onMessage?.(message, pass);

      response.data = data;

      const format = response.config.format;
      const formatItem = response.config.formatItem;
      const formatOut = response.config.formatOut;

      if (typeof onFormat !== 'function') return response;

      if (typeof format === 'function') {
        response.data = onFormat(format);
      } else if (typeof formatItem === 'function') {
        response.data = onFormat(formatItem, true);
      } else if (Array.isArray(formatOut)) {
        const formatData = dataFormat(formatOut);
        response.data = onFormat(formatData, true);
      }
    }

    return response;
  };

  return [reponseHandler];
};

export default { request, response };
