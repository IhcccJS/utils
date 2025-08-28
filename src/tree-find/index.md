---
nav:
  title: 方法
  order: 2
title: treeFind
group:
  title: 普通方法
  order: 1
---

## treeFind

树查找，返回第一个匹配的节点包含子节点

### API

```ts
type TNode = Record<string, any>;

type TFindFn = (node: TNode) => boolean;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

function treeFind(treeData: any[], findFn: TFindFn, config?: TConfig): TNode | null;
```

| 参数               | 类型       | 默认值       | 描述                                    |
| ------------------ | ---------- | ------------ | --------------------------------------- |
| treeData           | `TNode[]`  | -            | 树数据                                  |
| findFn             | `TFindFn`  | -            | 查找方法，返回 `boolean` 确定需要的节点 |
| config             | `TConfig`  | -            | 配置项                                  |
| config.deep        | `number`   | `0`          | 默认树深度                              |
| config.childrenKey | `children` | `'children'` | 子树字段值                              |
