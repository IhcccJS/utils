---
nav:
  title: 方法
  order: 2
title: arrayReplace
group:
  title: 普通方法
  order: 1
---

## arrayReplace

向指定数组插入对象到第一位，如果存在此元素，删除旧的元素，重新插入到第一位（默认）

### API

```ts
function arrayReplace(
  array: Record<string, any>[],
  item: Record<string, any>,
  id: string | number,
  fn: 'push' | 'unshift',
): Record<string, any>[];
```

| 参数  | 类型                    | 默认值 | 描述                                 |
| ----- | ----------------------- | ------ | ------------------------------------ |
| array | `Record<string, any>[]` | -      | 需要替换元素的数组                   |
| item  | `Record<string, any>`   | -      | 新元素对象                           |
| id    | `string` \| `number`    | -      | 根据此字段查询重复对象               |
| fn    | `string`                | -      | 插入到数组的方式 `push` \| `unshift` |
