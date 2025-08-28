/**
 * async/await 错误处理方法
 * @param {promise} promise 要处理的 `Promise`
 * @returns {array} [error, response]
 */
const awaitWrapper = (promise: Promise<any>): Promise<[null, any] | [Error, null]> => {
  return promise.then((r: any) => [null, r] as [null, any]).catch((e: Error) => [e, null]);
};

export default awaitWrapper;
