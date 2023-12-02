/**
 * 文件大小单位转换
 * @param {string|number} bytes 文件字节量
 * @returns {string} 文件大小
 */
function fileSizeFormatter (bytes: string | number): string {
  bytes = Number(bytes) || 0;
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

export default fileSizeFormatter;
