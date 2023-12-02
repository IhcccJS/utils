/**
 * 向指定数组插入对象到第一位，如果存在此元素，删除旧的元素，重新插入到第一位（默认）
 * @param {array} array - 需要替换替换元素的数组
 * @param {object} item - 元素对象
 * @param {string|number} id - 根据此字段查询重复对象
 * @param {string} fn - 插入到数组的方式
 * @returns {array} 修改后的数组
 */
function arrayReplace(array: any, item: any, id: string | number, fn: any): [] {
  if (!Array.isArray(array)) array = [];
  if (item !== void 0) {
    const search = array.find((a: any) => {
      if (item && typeof item === 'object') {
        if (id) return a[id] === item[id];
      }
      return a === item;
    });
    if (search) {
      array.splice(array.indexOf(item), 1);
    }
    if (typeof array[fn] === 'function') {
      array[fn](item);
    } else {
      array.unshift(item);
    }
  }
  return array;
}

export default arrayReplace;
