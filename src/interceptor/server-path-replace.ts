
type pathConfig = { key: string, value: string };

type storeData = { [key: string]: string };

export function serverPathReplaceInterceptor(serverList: pathConfig[]) {
  const replaceStore: storeData = {};

  const getServerFullPath = (prefix: string): string => {
    const server = serverList.find((item) => item.key === prefix);
    return server?.value || '';
  }

  return function (url: string, config: any) {
    let { serverPath, ...options } = config || {};

    if(url in replaceStore) return { url: replaceStore[url], options };

    let prefixUrl = url;

    if(!serverPath) {
      prefixUrl = prefixUrl.replace(/\{\{\w+\}\}/, (val) => {
        serverPath = val.replace(/\{\{|\}\}/g, '');
        return getServerFullPath(serverPath);
      });
    } else {
      prefixUrl = getServerFullPath(serverPath) + url;
    }

    replaceStore[url] = prefixUrl;

    return { url: prefixUrl, options  };
  };
}

export default serverPathReplaceInterceptor;
