---
nav:
  title: 方法
  order: 2
title: awaitWrapper
group:
  title: Promise 方法
  order: 2
---

## awaitWrapper

async/await 错误处理方法

### API

```ts
function awaitWrapper (promise: Promise<any>): Promise<[null, any] | [Error, null]>;
```

| 参数    | 类型           | 默认值 | 描述               |
| ------- | -------------- | ------ | ------------------ |
| promise | `Promise<any>` | -      | 要处理的 `Promise` |
