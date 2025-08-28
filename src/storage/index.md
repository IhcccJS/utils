---
nav:
  title: 方法
  order: 2
title: strorage
group:
  title: 普通方法
  order: 1
---

## strorage

更方便的操作本地缓存的方法

<code src="./demo"></code>

## `getStorage` 获取转换后的本地缓存，如果不存在，返回默认值

### API

```ts
function getStorage (key: string, defaultValue: any = '', secret?: string): any;
```

| 参数         | 类型     | 默认值 | 描述           |
| ------------ | -------- | ------ | -------------- |
| key          | `string` | -      | 本地缓存的键值 |
| defaultValue | `any`    | `''`   | 默认值         |
| secret       | `string` | -      | 加密密钥       |


## `setStorage` 保存数据到本地，如果不是字符串，将自动转为字符串

### API

```ts
function setStorage (key: string, value: any, secret?: string): void;
```

| 参数   | 类型     | 默认值 | 描述           |
| ------ | -------- | ------ | -------------- |
| key    | `string` | -      | 本地缓存的键值 |
| value  | `any`    | -      | 数据           |
| secret | `string` | -      | 加密密钥       |


## `removeStorage` 删除指定key值的缓存

### API

```ts
type filterFn = (name: string) => boolean;

function removeStorage (keys: string | string[] | null | undefined, includes: filterFn | boolean = true): void;
```

| 参数     | 类型                                      | 默认值 | 描述                                                                     |
| -------- | ----------------------------------------- | ------ | ------------------------------------------------------------------------ |
| keys     | `string \| string[] \| null \| undefined` | -      | 本地缓存的键值名称，传字符串删除单个，传字符串数组删多个，不传删全部     |
| includes | `filterFn \| boolean = true`              | -      | 删除项是否在 `keys` 内，或者使用一个返回 `true` 的方法，检查是否应该删除 |
