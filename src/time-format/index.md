---
nav:
  title: 方法
  order: 2
title: timeFormat
group:
  title: 普通方法
  order: 1
---

## timeFormat

时间格式化

### API

```ts
function timeFormat (second: number, granularity: 'hour' | 'h' | 'minute' | 'm' = 'minute'): number | string;
```

| 参数        | 类型                         | 默认值   | 描述       |
| ----------- | ---------------------------- | -------- | ---------- |
| second      | `number`                     | -        | 秒数       |
| granularity | `'hour'\|'h'\|'minute'\|'m'` | `minute` | 转换的粒度 |
