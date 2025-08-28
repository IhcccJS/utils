---
nav:
  title: 方法
  order: 2
title: treeToArray
group:
  title: 普通方法
  order: 1
---

## treeToArray

树转拉平的一维数组

### API

```ts
type TNode = Record<string, any>;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

function treeToArray(treeData: TNode[], config?: TConfig): TNode[];
```

| 参数               | 类型       | 默认值       | 描述       |
| ------------------ | ---------- | ------------ | ---------- |
| treeData           | `TNode[]`  | -            | 树数据     |
| config             | `TConfig`  | -            | 配置项     |
| config.deep        | `number`   | `0`          | 默认树深度 |
| config.childrenKey | `children` | `'children'` | 子树字段值 |
