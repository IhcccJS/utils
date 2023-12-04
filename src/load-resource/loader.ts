const RES_TYPE = {
  script: {
    element: 'script',
    load: (script: HTMLScriptElement, src: string) => {
      script.defer = true;
      script.src = src;
    },
  },
  link: {
    element: 'link',
    load: (link: HTMLLinkElement, href: string) => {
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;
    },
  },
};

type LoaderType = keyof typeof RES_TYPE;

class Loader {
  cache: Map<string, any>;

  resType: LoaderType;

  static RES_TYPE = RES_TYPE;

  constructor(resType: LoaderType) {
    this.cache = new Map();
    this.resType = resType;
  }

  load(path: string) {
    if (this.cache.has(path)) return;

    return new Promise((resolve, reject) => {
      this.cache.set(path, true);
      const resAttr = Loader.RES_TYPE[this.resType];
      const element = document.createElement(resAttr.element);
      resAttr.load(element as any, path);
      element.onerror = () => {
        this.cache.delete(path);
        reject();
      };
      element.onload = (element as any).onreadystatechange = () => {
        resolve(void 0);
      };
      document.head.appendChild(element);
    });
  }
}

export default Loader;
