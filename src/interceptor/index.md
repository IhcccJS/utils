---
nav:
  title: 方法
  order: 2
title: 拦截器
group: 
  title: Axios 拦截器
  order: 4
---

## abort

接口 401 中断其他接口请求

- abort.request 请求拦截器
- abort.response 响应拦截器

#### request 配置支持参数

| 参数        | 类型      | 默认值 | 描述           |
| ----------- | --------- | ------ | -------------- |
| abortEnable | `boolean` | -      | 是否允许被中断 |

## changePageParams

转换分页接口的参数 `pageSize`、`pageNumber`

- changePageParams({ defaultPageType, pageSizeMap }) 请求拦截器

```ts
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

function changePageParams(config: TChangePageParams = {}): Function;
```

#### request 配置支持参数

| 参数     | 类型     | 默认值 | 描述             |
| -------- | -------- | ------ | ---------------- |
| pageType | `string` | -      | 分页参数转换类型 |

## fakeRequest

配合 `FakeApi` 将请求数据转为虚拟数据

- fakeRequest.request 请求拦截器
- fakeRequest.response 响应拦截器

## format

格式化请求参数、返回数据

- format.request 请求拦截器
- format.response(config: TConfig) 响应拦截器

```ts
type TReqResult = { pass: boolean, data: any, message: string | boolean, onFormat: (formatFn: Function, isItemFormat: boolean) => any };
type TReqHandler = (res: any, config: requestConfig) => TReqResult;
type TConfig = { reqTypes: Record<string, TReqHandler> }
```

#### request 配置支持参数

| 参数       | 类型       | 默认值 | 描述                       |
| ---------- | ---------- | ------ | -------------------------- |
| formatIn   | `TUnit[]`  | -      | 请求参数数据格式化处理方法 |
| format     | `Function` | -      | 响应数据格式化处理方法     |
| formatItem | `Function` | -      | 响应数据单条格式化处理方法 |
| formatOut  | `TUnit[]`  | -      | 响应数据格式化处理方法     |

## getServerPath

统一添加服务地址；*已弃用，推荐使用 [serverPathReplace](/utils/interceptor)*

- getServerPath() 请求拦截器

## refreshToken

处理 `refresh token`，重新获取 `token`

- refreshToken.response(option: TResponseOption) 响应拦截器

```ts
type TResponseOption = {
  instance: Axios;
  refresh: () => Promise<any>;
  onRefresh: (response: any) => boolean;
  onSuccess?: () => {};
  onFail?: () => {};
};
```

## serverPathReplace

统一添加服务地址

- serverPathReplace(serverList: TPathConfig[]) 请求拦截器

```ts
type TPathConfig = { key: string, value: string };
```

#### request 配置支持参数

请求地址支持声明的变量，比如 `{{apiServer}}/api/xxx` 地址中的 `{{apiServer}}` 会被替换为 `http://localhost`。

```ts
const serverList = [{ key: 'apiServer', value: 'http://localhost' }];
request('{{apiServer}}/api/xxx')
```

## setHeader

统一添加请求头参数

- setHeader 请求拦截器

#### request 配置支持参数

| 参数       | 类型                  | 默认值 | 描述                                              |
| ---------- | --------------------- | ------ | ------------------------------------------------- |
| getHeaders | `() => THeaderConfig` | -      | 写在全局 Axios 的配置中，返回默认携带的请求头信息 |
| withHeader | `boolean`             | -      | 当前请求是否携带默认请求头信息                    |

## toFormData

将请求参数转为 `FormData`，默认不转换

- toFormData(option: TOption) 请求拦截器

```ts
type TOption = { defaultFormData: boolean };
```

#### request 配置支持参数

| 参数     | 类型      | 默认值 | 描述                                               |
| -------- | --------- | ------ | -------------------------------------------------- |
| formData | `boolean` | -      | 是否将当前请求的 `data` 数据转换为 `FormData` 类型 |
