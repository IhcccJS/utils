import { isArray, isFunction } from '../types/index';

type TNode = Record<string, any>;

type TConfig = {
  /** 节点关系 id 字段名称 */
  key: string;
  /** 关联父节点的 pid 字段名称 */
  parentKey: string;
  /** 根节点的 pid 字段判断值 */
  rootKey: string | string[];
  /** 节点关系 id 字段名称 */
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

const defaultConfig = {
  key: 'id',
  parentKey: 'pid',
  rootKey: '',
  childrenKey: 'children',
  parentNodes: [],
  deep: 0,
};

/**
 * 树生成，将数组转为树形数据
 * @param {array} array 具有树结构关系的一维数组
 * @param {object} config 配置
 * @member {string} config.key 节点关系 id 字段名称
 * @member {string} config.parentKey 关联父节点的 pid 字段名称
 * @member {string|array} config.rootKey 根节点的 pid 字段判断值
 * @member {number} config.deep 根节点默认深度；默认 `0`
 * @member {string} config.sort  排序方法
 * @member {function} config.transform 转换方法，可以借助此方法修改任意节点数据 (item) => item
 */
function treeFromArray(array: TNode[], config?: TConfig): TNode[] {
  const newConfig = Object.assign({}, defaultConfig, config);
  const { key, parentKey, rootKey, childrenKey, parentNodes, deep, transform, sort } = newConfig;

  const filterFn = isArray(rootKey)
    ? (item: TNode) => rootKey.includes(item[parentKey] as string)
    : (item: TNode) => item[parentKey] == rootKey;

  if (isFunction(sort)) array.sort(sort);

  return array.filter(filterFn).map((item) => {
    const children = treeFromArray(array, {
      ...newConfig,
      rootKey: item[key],
      parentNodes: parentNodes.concat(item),
      deep: deep + 1,
    });

    const node = Object.assign(item, children.length > 0 ? { deep, [childrenKey]: children } : { deep });

    if (isFunction(transform)) return transform(node, parentNodes);
    return node;
  });
}

export default treeFromArray;
