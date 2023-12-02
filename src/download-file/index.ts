/**
 * 下载文件
 * @param {string} path - 下载路径
 * @param {string} name - 文件名称
 */
let aElement: any = undefined;

function downloadFile(path: string, name: string) {
  if (path === void 0) return;
  if (!aElement) aElement = document.createElement('a');
  if (aElement instanceof HTMLElement) {
    aElement.setAttribute('href', path);
    aElement.setAttribute('download', name);
    aElement.click();
  }
}

export default downloadFile;
