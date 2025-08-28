---
nav:
  title: 介绍
  order: 0
title: 清单
---

## 普通方法

| 方法名                                          | 功能描述                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| [arrayReplace](/utils/array-replace)            | 数组替换或新增元素                                                             |
| [copyText](/utils/copy-text)                    | 拷贝字符串                                                                     |
| [countRatio](/utils/count-ratio)                | 计算两个数值比例                                                               |
| [dataFormat](/utils/data-format)                | 数据格式化                                                                     |
| [decimal](/utils/decimal)                       | 获取指定精度的小数                                                             |
| [fileSizeFormatter](/utils/file-size-formatter) | 文件大小格式化                                                                 |
| [isLngLat](/utils/is-lng-lat)                   | 判断给定对象是否是地图坐标数据                                                 |
| [joinString](/utils/join-string)                | 字符串数组按给定字符拼接，过滤非真值                                           |
| [jsonStringFormat](/utils/json-string-format)   | `json` 字符串转 `js` 对象                                                      |
| ~[mapToTree](/utils/map-to-tree)~               | 将数组转为树形数据；*已弃用，推荐使用 [treeFromArray](/utils/tree-from-array)* |
| [omitData](/utils/omit-data)                    | 按回调条件过滤对象中的数据值，返回一个新的对象                                 |
| [random](/utils/random)                         | 生成随机数，可指定范围、精度、数组                                             |
| [randomColorHex](/utils/color)                  | 生成随机 `HEX` 颜色，`#ffffff`                                                 |
| [randomColorRgb](/utils/color)                  | 生成随机 `RGB` 颜色，`rgb(128, 128, 128)`                                      |
| [getStorage](/utils/storage)                    | 获取本地缓存，字符串自动转引用类型数据，可解密                                 |
| [setStorage](/utils/storage)                    | 设置本地缓存，引用类型数据自动转字符串，可加密                                 |
| [removeStorage](/utils/storage)                 | 删除指定范围或范围外的本地缓存                                                 |
| [timeFormat](/utils/time-format)                | 时间戳转时间字符串 `timeFormat(123456, 'h')` -> `34:17:36`                     |
| [treeFilter](/utils/tree-Filter)                | <Badge>树操作</Badge> 树过滤，返回匹配节点以及祖孙节点                         |
| [treeFind](/utils/tree-find)                    | <Badge>树操作</Badge> 树查找，返回第一个匹配的节点包含子节点                   |
| [treeForEach](/utils/tree-for-each)             | <Badge>树操作</Badge> 树遍历，回调所有节点；支持广度优先和深度优先             |
| [treeFromArray](/utils/tree-from-array)         | <Badge>树操作</Badge> 树生成，将数组转为树形数据；替代 `mapToTree`             |
| [treeMap](/utils/tree-map)                      | <Badge>树操作</Badge> 树更新，替换或删除匹配的节点数据                         |
| [treeMatch](/utils/tree-match)                  | <Badge>树操作</Badge> 树匹配，返回所有匹配的节点                               |
| [treeToArray](/utils/tree-to-array)             | <Badge>树操作</Badge> 树转拉平的一维数组                                       |
| [isArray](/utils/types)                         | 判断是否为 `array`                                                             |
| [isBoolean](/utils/types)                       | 判断是否为 `boolean`                                                           |
| [isFunction](/utils/types)                      | 判断是否为 `function`                                                          |
| [isNumber](/utils/types)                        | 判断是否为 `number`                                                            |
| [isObject](/utils/types)                        | 判断是否为 `object`                                                            |
| [isString](/utils/types)                        | 判断是否为 `string`                                                            |
| [isSymbol](/utils/types)                        | 判断是否为 `Symbol`                                                            |
| [isNull](/utils/types)                          | 判断是否为 `null`                                                              |
| [isUndefined](/utils/types)                     | 判断是否为 `undefined`                                                         |
| [uuid](/utils/uuid)                             | 生成 `id`                                                                      |

## `Promise` 方法

| 方法名                               | 功能描述                                                   |
| ------------------------------------ | ---------------------------------------------------------- |
| [awaitWrapper](/utils/await-wrapper) | 将 `Pormise` 异常错误和结果合并为 `[error, result]` 的数组 |
| [delay](/utils/delay)                | 异步延时 `setTimeout`                                      |
| [forEachPromised](/utils/foreach)    | 支持异步回调的 `forEach`                                   |
| [promiseForEach](/utils/foreach)     | 对 `Promise[]` 进行遍历                                    |
| [getBase64](/utils/get-base64)       | 获取文件 `base64`                                          |
| [loadCss](/utils/load-resource)      | 加载 `CSS` 文件                                            |
| [loadScript](/utils/load-resource)   | 加载 `JS` 文件                                             |

## 类

| 方法名                               | 功能描述     |
| ------------------------------------ | ------------ |
| [EventEmitter](/utils/event-emitter) | 事件发布订阅 |
| [FakeApi](/utils/fake-api)           | 虚拟请求     |

## `Axios` 拦截器

| 方法名                                  | 功能描述                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| [changePageParams](/utils/interceptor)  | `axios 拦截器` 修改请求分页参数                                                             |
| [fakeRequest](/utils/fake-request)      | `axios 拦截器` 响应本地数据                                                                 |
| [format](/utils/format)                 | `axios 拦截器` 参数、数据格式化                                                             |
| [refreshToken](/utils/refresh-token)    | `axios 拦截器` 处理 `refresh token`                                                         |
| ~[getServerPath](/utils/interceptor)~   | `axios 拦截器` 统一添加服务地址；*已弃用，推荐使用 [serverPathReplace](/utils/interceptor)* |
| [serverPathReplace](/utils/interceptor) | `axios 拦截器` 统一添加服务地址                                                             |
| [setHeader](/utils/interceptor)         | `axios 拦截器` 统一添加请求头参数                                                           |
| [toFormData](/utils/interceptor)        | `axios 拦截器` 将请求参数转为 `FormData`                                                    |
