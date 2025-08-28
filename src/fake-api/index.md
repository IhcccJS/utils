---
nav:
  title: 方法
  order: 2
title: FakeApi
group:
  title: 类
  order: 3
---

# FakeApi

`FakeApi` 是一个类，用于实例化一个基础的虚拟列表功能，实例下会包含 CURD 等常用的几个功能，用于虚拟请求，可以结合项目内的 `mock` 功能快速实现虚拟的接口。

## 基础用法

```jsx
import React from 'react';
import { FakeApi } from '@ihccc/utils';

const rowKey = 'name';

// 初始数据
const initData = [
  { name: '张三', sex: '1', score: 80 },
  { name: '李四', sex: '1', score: 90 },
];
// 实例化一个功能
const users = new FakeApi(initData, {
  queryType: { name: 'is' },
  key: rowKey,
  timeout: [100, 600],
  debug: true,
});

window.users = users;

function Demo() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const fetch = React.useCallback(async () => {
    // 查询列表
    setLoading(true);
    const result = await users.query();
    setLoading(false);
    setData(result);
  }, []);

  const profile = React.useCallback(async (key) => {
    // 查询详情
    setLoading(true);
    const result = await users.profile({ [rowKey]: key });
    setLoading(false);
    setData(result);
  }, []);

  const remove = React.useCallback(async (key) => {
    // 删除
    setLoading(true);
    const result = await users.remove({ [rowKey]: key });
    setLoading(false);
    setData(result);
  }, []);

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button disabled={loading} onClick={fetch}>
          {loading ? '刷新中...' : '刷新列表'}
        </button>
        {data?.data?.list?.map((item) => (
          <button
            disabled={loading}
            onClick={() => profile(item[rowKey])}
            key={item[rowKey] + 'profile'}
          >
            查询{item.name}详情 {loading && '中...'}
          </button>
        ))}
        {data?.data?.list?.map((item) => (
          <button
            type="primary"
            disabled={loading}
            onClick={() => remove(item[rowKey])}
            key={item[rowKey] + 'del'}
          >
            删除 {item.name} {loading && '中...'}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {loading ? (
          '加载中...'
        ) : (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default Demo;
```

## 配合 `mock` 使用

mock 文件

```js
import { FakeApi } from '@ihccc/utils';

// 初始数据
const initData = [{ name: '张三', sex: '1', score: 80 }];
// 实例化一个功能
const users = new FakeApi(initData, {
  queryType: { id: 'is', name: 'like' },
});

export default {
  // 查询
  'GET /api/users': async (req, res) => {
    // 查询参数：pageNumber, pageSize, name
    const result = await users.query(req.query);
    res.send(result);
  },
  // 新增
  'POST /api/users/create': async (req, res) => {
    // 直接传入一个object创建
    const result = await users.create(req.body);
    res.send(result);
  },
  // 更新
  'POST /api/users/update': async (req, res) => {
    // 根据id进行修改
    const result = await users.update(req.body);
    res.send(result);
  },
  // 删除
  'POST /api/users/remove': async (req, res) => {
    // 根据id 或者以','分割的多个id进行删除
    const result = await users.remove(req.body);
    res.send(result);
  },
  // 详情
  'GET /api/users/profile': async (req, res) => {
    // 根据id查询
    const result = await users.profile(req.query);
    res.send(result);
  },
  // 全部列表
  'GET /api/users/list': async (req, res) => {
    // 获取全部的列表数据
    const result = await users.list(req.query);
    res.send(result);
  },
};
```

## `FakeApi` 参数

```ts
new FakeApi(dataSource: string | TObject[] | FakeApi | (() => Promise<TObject[]>), config : TFakeApiConfig);
```

`dataSource` 功能列表的初始数据，可以是一个数组、数据文件的路径、方法。初始化时，内部会自动对每条数据添加对应的 `key`，以及新增时间和更新时间。

`config` 配置参数如下：

| 名称           | 类型       | 默认值       | 描述                                                                                                              |
| -------------- | ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| key            | `string`   | `id`         | 主键字段名称                                                                                                      |
| name           | `string`   | `表i`        | 表名称                                                                                                            |
| queryType      | `object`   | `{}`         | 配置查询字段和对应的查询方式，目前支持`is`全匹配，`like` 模糊匹配，`include` 包含                                 |
| queryTypeFn    | `object`   | `{}`         | 配置自定义查询方式                                                                                                |
| createTime     | `string`   | `createTime` | 创建时间字段名称                                                                                                  |
| updateTime     | `string`   | `updateTime` | 更新时间字段名称                                                                                                  |
| sort           | `function` | `undefined`  | 查询数据时的排序方法，默认按照 `updateTime` 属性降序                                                              |
| getCurrentTime | `function` | `undefined`  | 数据字段自定义获取时间数据                                                                                        |
| resultType     | `object`   | `undefined`  | 自定义数据响应格式                                                                                                |
| lazyLoad       | `boolean`  | `false`      | 数据懒加载，如果初始数据不直接配置数组，就应该设置 `true`                                                         |
| format         | `function` | `null`       | 数据加载后，可以通过此方法进行数据格式化处理                                                                      |
| timeout        | `array`    | `[100, 500]` | 请求延迟范围，单位毫秒                                                                                            |
| debug          | `boolean`  | `true`       | 是否开启调试，如果仅使用`FakeApi`的功能，浏览器 `network`不会有请求的日志，开启此选项，将在控制台打印请求到的数据 |

## `FakeApi` 实例方法

| 名称        | 参数     | 成功返回值                                                                          | 描述                         |
| ----------- | -------- | ----------------------------------------------------------------------------------- | ---------------------------- |
| init        | `array`  | `void 0`                                                                            | 该方法将初始化一组数据到列表 |
| query       | `object` | `{ success: true, code: '0', data: { total: 0, list: [] }, message: '查询成功！' }` | 查询分页                     |
| querySync   | `object` | `list`                                                                              | 查询分页，同步               |
| queryWith   | `object` | `{ success: true, code: '0', data: { total: 0, list: [] }, message: '查询成功！' }` | 查询分页，带关联数据         |
| create      | `object` | `{ success: true, code: '0', message: '新增成功！' }`                               | 新增数据                     |
| createSync  | `object` | `list`                                                                              | 新增数据，同步               |
| createWith  | `object` | `{ success: true, code: '0', message: '新增成功！' }`                               | 新增数据，带关联数据         |
| update      | `object` | `{ success: true, code: '0', message: '更新成功！' }`                               | 更新数据                     |
| updateSync  | `object` | `list`                                                                              | 更新数据，同步               |
| updateWith  | `object` | `{ success: true, code: '0', message: '更新成功！' }`                               | 更新数据，带关联数据         |
| remove      | `object` | `{ success: true, code: '0', message: '删除成功！' }`                               | 删除数据                     |
| removeSync  | `object` | `list`                                                                              | 删除数据，同步               |
| removeWith  | `object` | `{ success: true, code: '0', message: '删除成功！' }`                               | 删除数据，带关联数据         |
| profile     | `object` | `{ success: true, code: '0', data: {}, message: '查询成功！' }`                     | 查询详情                     |
| profileSync | `object` | `list`                                                                              | 查询详情，同步               |
| profileWith | `object` | `{ success: true, code: '0', data: {}, message: '查询成功！' }`                     | 查询详情，带关联数据         |
| list        | `-`      | `{ success: true, code: '0', list: [], message: '查询成功！' }`                     | 查询列表                     |
| listSync    | `object` | `list`                                                                              | 查询列表，同步               |
| listWith    | `object` | `{ success: true, code: '0', list: [], message: '查询成功！' }`                     | 查询列表，带关联数据         |
| request     | `any`    | `params`                                                                            | 参数传什么，就返回什么       |
| pick        | `object` | `{}`                                                                                | 随机返回列表元素，同步       |
| getItem     | `object` | `{}`                                                                                | 查询数据某一项，同步         |
| getList     | `object` | `list`                                                                              | 返回数据列表，同步           |
| isEmpty     | `-`      | `boolean`                                                                           | 当前表是否有数据             |
| lazyInit    | `object` | `void 0`                                                                            | 异步初始化数据，无需手动调用 |
| hasOne      | `object` | `void 0`                                                                            | 一对一关联表                 |
| hasMany     | `object` | `void 0`                                                                            | 一对多关联表                 |
| search      | `object` | `list`                                                                              | 搜索列表                     |
| getLinked   | `object` | `{ success: true, code: '0', list: [], message: '查询成功！' }`                     | 查询关联表数据，同步         |
