---
nav:
  title: 方法
  order: 2
title: omitData
group:
  title: 普通方法
  order: 1
---

## omitData

删除对象匹配的数据

### API

```ts
function omitData (data: any, filter: (key: string, value: any) => boolean): Record<string, any>;
```

| 参数   | 类型                                   | 默认值 | 描述         |
| ------ | -------------------------------------- | ------ | ------------ |
| data   | `any`                                  | -      | 要处理的数据 |
| filter | `(key: string, value: any) => boolean` | -      | 过滤方法     |
