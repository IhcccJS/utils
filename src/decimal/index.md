---
nav:
  title: 方法
  order: 2
title: decimal
group:
  title: 普通方法
  order: 1
---

## decimal

取小数位数

<code src="./demo/test1.jsx" compact></code>


### API

```ts
function decimal (num: number, precision: number = -1): number;
```

| 参数      | 类型     | 默认值 | 描述                      |
| --------- | -------- | ------ | ------------------------- |
| num       | `number` | -      | 数值                      |
| precision | `number` | `-1`   | 小数位数，小于 `0` 不处理 |
