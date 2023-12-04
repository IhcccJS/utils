import Loader from './loader';

const linkLoader = new Loader('link');

/**
 * 注入 css
 * @param path link path
 */
function loadCss(path: string) {
  linkLoader.load(path);
}

export default loadCss;
