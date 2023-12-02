import { TChangePageParams, TPageParams } from "./index.d";

/**
 * 修改页码参数
 */
function changePageParams(url: string, options: TChangePageParams) {
  const { useLimit = true, ...restOptions } = options;
  if (useLimit) {
    const { pageNumber: limit, pageSize, ...restData } = restOptions.data as TPageParams;
    restOptions.data = {
      ...restData,
      limit,
      offset: (limit - 1) * pageSize,
    };
  }

  return { url, options: restOptions };
}

export default changePageParams;
