---
nav:
  title: 方法
  order: 2
title: treeMap
group:
  title: 普通方法
  order: 1
---

## treeMap

树更新，替换或删除匹配的节点数据

### API

```ts
type TNode = Record<string, any>;

type TMapFn = (node: TNode, deep: number) => TNode | Boolean;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

function treeMap(treeData: TNode[], mapFn: TMapFn, config?: TConfig): TNode[] ;
```

| 参数               | 类型       | 默认值       | 描述                                                                                      |
| ------------------ | ---------- | ------------ | ----------------------------------------------------------------------------------------- |
| treeData           | `TNode[]`  | -            | 树数据                                                                                    |
| mapFn              | `TMapFn`   | -            | 操作方法，返回 `boolean` 确定是否保留节点；返回新对象，用于修改原节点；不返回，拷贝原节点 |
| config             | `TConfig`  | -            | 配置项                                                                                    |
| config.deep        | `number`   | `0`          | 默认树深度                                                                                |
| config.childrenKey | `children` | `'children'` | 子树字段值                                                                                |
