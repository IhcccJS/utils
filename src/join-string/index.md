---
nav:
  title: 方法
  order: 2
title: joinString
group:
  title: 普通方法
  order: 1
---

## joinString

字符串拼接，会自动过滤掉假值

### API

```ts
function joinString(...args: string[]): string;
```

| 参数      | 类型       | 默认值 | 描述                              |
| --------- | ---------- | ------ | --------------------------------- |
| `...args` | `string[]` | -      | 任意多个待拼接字符，使用 `-` 拼接 |


如果只有一个参数，将返回上面所示的方法

```ts
function joinString(symbol: string): (...args: string[]) => string;
```

| 参数   | 类型     | 默认值 | 描述     |
| ------ | -------- | ------ | -------- |
| symbol | `string` | -      | 拼接字符 |
