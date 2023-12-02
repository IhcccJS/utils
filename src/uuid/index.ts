let id = 0;

/**
 * 创建 id
 * @param {string} prefix 前缀，默认 uuid
 * @returns
 */
const uuid = (prefix: string = 'uuid'): string => {
  const currentTime = Date.now();
  return `${prefix}_${currentTime.toString(36)}_${id++}`;
};

export default uuid;
