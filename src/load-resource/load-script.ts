import Loader from './loader';

const scriptLoader = new Loader('script');

/**
 * 注入 script
 * @param path script path
 */
function loadScript(path: string) {
  scriptLoader.load(path);
}

export default loadScript;
