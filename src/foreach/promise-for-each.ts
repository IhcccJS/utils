/**
 * Promise 数组遍历回调
 * @param {*} array Promise类型元素数组
 * @param {*} callback 处理每个 Promise.then 回调的方法
 * @param {*} start 起始索引，默认 0
 * @returns 结果列表
 * @example
 * promiseForEach([
 *  () => Promise.resolve(1),
 *  () => Promise.resolve(2),
 *  () => Promise.resolve(3)
 * ], (item, index) => {
 *  return item + index;
 * }).then((res) => {
 *  // res => [1, 3, 5]
 *  console.log('done', res);
 * });
 */
const promiseForEach = (array: Function[], callback: Function, start: number = 0): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) return reject();
    const results: any[] = [];
    function loop(index: number) {
      if (index >= array.length) return resolve(results);

      const action = array[index];
      const next = () => loop(index + 1);
      const promised = action?.();

      if (promised && typeof promised.then === 'function') {
        promised
          .then((res: any) => {
            let handledRes = res;
            if (typeof callback === 'function') handledRes = callback(res, index) || res;
            results.push(handledRes);
            next();
          })
          .catch(() => {
            reject(index);
          });
      } else {
        next();
      }
    }

    loop(start);
  });
};

export default promiseForEach;
