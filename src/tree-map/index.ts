type TNode = Record<string, any>;

type TMapFn = (node: TNode, deep: number) => TNode | Boolean;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

const defaultConfig = {
  deep: 0,
  childrenKey: 'children',
};

/**
 * 树查找，返回第一个匹配的节点包含子节点
 * @param {array} treeData 树结构数据
 * @param {function} mapFn 操作方法，参数为节点数据和节点深度；返回 `false` 删除节点，返回假值不操作，返回对象替换原节点
 * @param {object} config 配置
 * @member {number} config.deep 根节点默认深度；默认 `0`
 * @member {string} config.childrenKey 子节点 `key`；默认 `children`
 */
function treeMap(treeData: TNode[], mapFn: TMapFn, config?: TConfig): TNode[] {
  // 基础条件：空树直接返回空数组
  if (!treeData || !treeData.length) return [];

  const { deep, childrenKey } = Object.assign({}, defaultConfig, config);

  return treeData
    .map((node) => {
      let children;
      // 对存在子节点，执行相同操作
      if (node[childrenKey]) children = treeMap(node[childrenKey], mapFn, { ...config, deep: deep + 1 });
      // 获取节点数据修改项
      const item = mapFn({ ...node, ...(!children ? {} : { [childrenKey]: children }) }, deep);
      // 如果修改值为 false 单独返回，进行后续过滤操作
      if (item === false) return false;
      // 如果是其他值
      return { ...(item || node) };
    })
    .filter((node) => node !== false) as TNode[];
}

export default treeMap;
