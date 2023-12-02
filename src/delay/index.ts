/**
 * 延时函数 - promise 版
 * @param {number} ms 延时毫秒
 * @returns
 */
const delay = (ms: number): Promise<unknown> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms || 0);
  });

export default delay;
