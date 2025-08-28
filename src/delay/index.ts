/**
 * 延时方法 - promise 版
 * @param {number} ms 延时时间，毫秒
 * @returns
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms || 0);
  });

export default delay;
