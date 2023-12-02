/**
 * 加载js文件
 * @param {string} src - 需要加载的js路径
 * @param {boolean} retain - 保留script标签
 * @returns {Promise}
 */
const loadScript = (src: string, retain = false): Promise<unknown> =>
  new Promise((resolve: any) => {
    const script: any = document.createElement('script');
    script.onload = script.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        resolve();
        script.onload = script.onreadystatechange = null;
        if (!retain) document.head.removeChild(script);
      }
    };
    script.src = src;
    document.head.appendChild(script);
  });

export default loadScript;
