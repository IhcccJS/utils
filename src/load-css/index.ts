
/**
 * 加载css文件
 * @param {string} href - 需要加载的css路径
 * @returns {Promise}
 */
const loadCss = (href: any): Promise<unknown> =>
  new Promise((resolve: any) => {
    const link: any = document.createElement('link');
    link.onload = link.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        resolve();
        link.onload = link.onreadystatechange = null;
      }
    };
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });

export default loadCss;
