---
nav:
  title: 方法
  order: 2
title: forEachPromise
group:
  title: Promise 方法
  order: 2
---

## forEachPromised

支持 Promise 的 forEach

场景举例：对一个异步方法，按序传入参数进行执行，并返回

<code src="./demo/test1.jsx"></code>

### API

```ts
function forEachPromised (array: any[], callback: Function, start: number = 0): Promise<any>;
```

| 参数     | 类型       | 默认值 | 描述     |
| -------- | ---------- | ------ | -------- |
| array    | `any[]`    | -      | 参数列表 |
| callback | `Function` | `-1`   | 回调方法 |
| start    | `number`   | `-1`   | 开始位置 |


## promiseForEach

Promise 数组遍历回调

<code src="./demo/test2.jsx"></code>

### API

```ts
function promiseForEach (array: Function[], callback: Function, start: number = 0): Promise<any>
```

| 参数     | 类型         | 默认值 | 描述         |
| -------- | ------------ | ------ | ------------ |
| array    | `Function[]` | -      | 异步方法列表 |
| callback | `Function`   | `-1`   | 回调方法     |
| start    | `number`     | `-1`   | 开始位置     |
