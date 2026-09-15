---
nav:
  title: 方法
  order: 2
title: executeRaf
group:
  title: 动画帧方法
  order: 5
---

## executeRaf

在每帧里渐进的运行方法，避免阻塞渲染主线程导致页面卡顿。适用于需要处理大量数据但又不想阻塞 UI 渲染的场景。

<code src="./demo/test1.jsx"></code>

### API

```ts
interface ExecuteRafOptions {
  frameTime?: number;      // 每帧最大执行时间（毫秒），默认 16
  minItemsPerFrame?: number; // 每帧最小处理项数，默认 1
}

interface ExecuteRafResult {
  done: boolean;      // 是否已完成所有处理
  processed: number;  // 已处理的项数
}

function executeRaf<T>(
  list: T[],
  callback: (item: T, index: number, list: T[]) => boolean | void,
  options?: ExecuteRafOptions
): { promise: Promise<ExecuteRafResult>; cancel: () => void };
```

#### 参数

| 参数     | 类型                              | 默认值 | 描述                                          |
| -------- | --------------------------------- | ------ | --------------------------------------------- |
| list     | `T[]`                             | -      | 要处理的列表                                  |
| callback | `(item, index, list) => boolean \| void` | - | 处理每一项的回调，返回 false 可中断处理 |
| options  | `ExecuteRafOptions`               | -      | 配置选项                                      |

#### options

| 参数             | 类型     | 默认值 | 描述                               |
| ---------------- | -------- | ------ | ---------------------------------- |
| frameTime        | `number` | `16`   | 每帧最大执行时间（毫秒）           |
| minItemsPerFrame | `number` | `1`    | 每帧最小处理项数，避免帧内处理太少 |

#### 返回值

| 属性    | 类型                              | 描述                       |
| ------- | --------------------------------- | -------------------------- |
| promise | `Promise<ExecuteRafResult>`       | 处理完成后的 Promise       |
| cancel  | `() => void`                      | 取消后续处理的函数         |