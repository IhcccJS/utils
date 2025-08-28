---
nav:
  title: 方法
  order: 2
title: dataFormat
group:
  title: 普通方法
  order: 1
---

## dataFormat

数据转换

### API

```ts
type TUnit = (data: Record<string, any>) => Record<string, any>;

function dataFormat(list: TUnit[]): (data: Record<string, any>) => Record<string, any>;
```


| 参数 | 类型      | 默认值 | 描述             |
| ---- | --------- | ------ | ---------------- |
| list | `TUnit[]` | -      | 数据转换方法列表 |
