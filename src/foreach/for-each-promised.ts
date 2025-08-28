/**
 * 支持 Promise 的 forEach
 * @param {array} array 任意元素数组
 * @param {function} callback Promise 类型的回调方法
 * @param {number} start 起始索引，默认 0
 * @returns 结果列表
 * @example
 * forEachPromised([1, 2, 3], (item, index) => {
 *  return new Promise((resolve) => {
 *    resolve(item + index);
 *  });
 * }).then((res) => {
 *  // res => [1, 3, 5]
 *  console.log('done', res);
 * });
 */
const forEachPromised = (array: any[], callback: Function, start: number = 0): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) return reject();
    const results: any[] = [];
    function loop(index: number) {
      if (index >= array.length) return resolve(results);

      const item = array[index];
      const next = () => loop(index + 1);

      if (typeof callback === 'function') {
        callback(item, index)
          .then((res: any) => {
            results.push(res);
            next();
          })
          .catch(reject);
      } else {
        next();
      }
    }

    loop(start);
  });
};

export default forEachPromised;
