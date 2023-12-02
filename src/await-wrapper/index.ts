/**
 * async/await 错误处理方法
 * @param {promise} promise 要处理的promise
 * @returns {array} [error, response]
 */
const awaitWrapper = (promise: any): any => {
  return promise.then((r: any) => [null, r]).catch((e: any) => [e, null]);
};

export default awaitWrapper;
