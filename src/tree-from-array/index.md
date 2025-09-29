---
nav:
  title: 方法
  order: 2
title: treeFromArray
group:
  title: 普通方法
  order: 1
---

## treeFromArray

树生成，将数组转为树形数据

### API

```ts
type TNode = Record<string, any>;

type TConfig = {
  /** 节点关系 id 字段名称 */
  key: string;
  /** 关联父节点的 pid 字段名称 */
  parentKey: string;
  /** 根节点的 pid 字段判断值 */
  rootKey: string | string[];
  /** 子树字段值 */
  childrenKey: string;
  /** 默认父级节点列表 */
  parentNodes: TNode[];
  /** 根节点默认深度；默认 `0` */
  deep: number;
  /** 转换方法 */
  transform: (node: TNode, parentNode: TNode[]) => TNode;
  /** 排序方法 */
  sort: (node: TNode) => any;
};

function treeFromArray(array: TNode[], config?: TConfig): TNode[];
```

| 参数               | 类型                 | 默认值       | 描述                                                       |
| ------------------ | -------------------- | ------------ | ---------------------------------------------------------- |
| array              | `TNode[]`            | -            | 具有树关联字段的一维数组数据                               |
| config             | `TConfig`            | -            | 配置项                                                     |
| config.key         | `string`             | `'id'`       | 节点关系 id 字段名称                                       |
| config.parentKey   | `string`             | `'pid'`      | 关联父节点的 pid 字段名称                                  |
| config.rootKey     | `string \| string[]` | `''`         | 根节点的 pid 字段判断值                                    |
| config.childrenKey | `string`             | `'children'` | 子树字段值                                                 |
| config.parentNodes | `TNode[]`            | `[]`         | 默认父级节点列表                                           |
| config.deep        | `number`             | `0`          | 根节点默认深度，默认 `0`；设置 `null` 将不添加 `deep` 字段 |
| config.transform   | `Function`           | -            | 转换方法                                                   |
| config.sort        | `Function`           | -            | 排序方法                                                   |

