---
nav:
  title: 方法
  order: 2
title: treeForEach
group:
  title: 普通方法
  order: 1
---

## treeForEach

树遍历，回调所有节点；支持广度优先和深度优先

### API

```ts
type TNode = Record<string, any>;

type TCallback = (node: TNode, depth: number) => boolean | void;

type TConfig = {
  /** 执行模式，BFS: 广度优先；DFS: 深度优先 */
  mode?: 'BFS' | 'DFS';
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

function treeForEach(treeData: TNode[], callback: TCallback, config?: TConfig): void;
```

| 参数               | 类型             | 默认值       | 描述                                            |
| ------------------ | ---------------- | ------------ | ----------------------------------------------- |
| treeData           | `TNode[]`        | -            | 树数据                                          |
| callback           | `TCallback`      | -            | 回调方法，返回 `false` 终止当前层级继续遍历节点 |
| config             | `TConfig`        | -            | 配置项                                          |
| config.mode        | `'BFS' \| 'DFS'` | `'BFS'`      | 执行模式，BFS: 广度优先；DFS: 深度优先          |
| config.deep        | `number`         | `0`          | 默认树深度                                      |
| config.childrenKey | `children`       | `'children'` | 子树字段值                                      |
