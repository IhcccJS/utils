type TSizeMap = Record<string, (pageNumber: number, pageSize: number) => Record<string, number>>;

type TChangePageParams = {
  defaultPageType?: keyof TSizeMap | null;
  pageSizeMap?: TSizeMap;
};

const defaultConfig: TChangePageParams = {
  defaultPageType: null,
  pageSizeMap: {
    limitAndOffset: (pageNumber, pageSize) => {
      return { limit: pageNumber, offset: (pageNumber - 1) * pageSize };
    },
  },
};

/**
 * 修改页码参数
 */
function changePageParams(config: TChangePageParams = {}) {
  const { defaultPageType, pageSizeMap } = {
    ...defaultConfig,
    ...config,
    pageSizeMap: { ...defaultConfig.pageSizeMap, ...config.pageSizeMap },
  };

  return function (url: string, options: any) {
    const { pageType = defaultPageType, ...restOptions } = options;

    if (!!pageType && !!pageSizeMap && !!pageSizeMap[pageType]) {
      const { pageNumber, pageSize } = Object.assign({}, restOptions.data, restOptions.params);
      const pageParams = pageSizeMap[pageType](pageNumber, pageSize);

      if (restOptions.params.pageNumber > 0 && restOptions.params.pageSize > 0) {
        restOptions.params = { ...restOptions.params, ...pageParams };
      }
      if (restOptions.data.pageNumber > 0 && restOptions.data.pageSize > 0) {
        restOptions.data = { ...restOptions.data, ...pageParams };
      }
    }

    return { url, options: restOptions };
  };
}

export default changePageParams;
