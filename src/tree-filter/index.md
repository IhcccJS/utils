---
nav:
  title: 方法
  order: 2
title: treeFilter
group:
  title: 普通方法
  order: 1
---

## treeFilter

树过滤，返回匹配节点以及祖孙节

### API

```ts
type TNode = Record<string, any>;

type TFilterFn = (node: TNode, deep: number) => boolean;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

function treeFilter(treeData: TNode[], filterFn: TFilterFn, config?: TConfig): TNode[];
```

| 参数               | 类型        | 默认值       | 描述                                    |
| ------------------ | ----------- | ------------ | --------------------------------------- |
| treeData           | `TNode[]`   | -            | 树数据                                  |
| filterFn           | `TFilterFn` | -            | 过滤方法，返回 `boolean` 确定需要的节点 |
| config             | `TConfig`   | -            | 配置项                                  |
| config.deep        | `number`    | `0`          | 默认树深度                              |
| config.childrenKey | `children`  | `'children'` | 子树字段值                              |
