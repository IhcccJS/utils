---
nav:
  title: 方法
  order: 2
title: random
group:
  title: 普通方法
  order: 1
---

## random

生成随机指定位数的小数或数组中随机选择一个元素。

## 基础用法

<code src="./demo/base" compact></code>

### API

```ts
function random<T>(min: number | T[], max?: number, precision?: number): number | T;
```

| 参数      | 类型     | 默认值 | 描述                                                                                                             |
| --------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| min       | `number` | -      | 如果是数字，则表示随机数的下限；如果是数组，则从中随机选取一个元素；如果没有第二个参数，则表示上限，下限为 `0`。 |
| max       | `number` | -      | 可选，当不传入时，第一个参数表示上限，下限为 `0`；当第一个参数为数字时，表示随机数的上限。                       |
| precision | `number` | -      | 小数位数                                                                                                         |
