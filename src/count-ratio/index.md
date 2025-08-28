---
nav:
  title: 方法
  order: 2
title: countRatio
group:
  title: 普通方法
  order: 1
---

## countRatio

比列计算

### API

```ts
function ratio(data: Record<string, string | number>, a: number | string, b: number | string): string;
```


| 参数 | 类型                               | 默认值 | 描述         |
| ---- | ---------------------------------- | ------ | ------------ |
| data | `Record<string, string \| number>` | -      | 数据来源对象 |
| a    | `number` \| `string`               | -      | 分子         |
| b    | `number` \| `string`               | -      | 分母         |
