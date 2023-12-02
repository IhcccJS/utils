import toFixed from '../to-fixed/index';

/**
 * 时间格式化
 * @param {string} second - 秒
 * @param {string} granularity - 粒度 hour / h / minute / m
 */
const timeFormat = (second: number, granularity: 'hour' | 'h' | 'minute' | 'm' = 'minute'): number | string => {
  if (/\d+/g.test(String(second))) {
    if (granularity === 'hour' || granularity === 'h') {
      const hours = Math.floor(second / 60 / 60);
      const minutes = Math.floor((second / 60) % 60);
      const seconds = Math.floor(second % 60);
      return `${toFixed(hours)}:${toFixed(minutes)}:${toFixed(seconds)}`;
    }

    if (granularity === 'minute' || granularity === 'm') {
      const minutes = Math.floor(second / 60);
      const seconds = Math.floor(second % 60);
      return `${toFixed(minutes)}:${toFixed(seconds)}`;
    }
  }

  return second;
};

export default timeFormat;
