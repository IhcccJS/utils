import treeForEach from '../tree-for-each';

type TNode = Record<string, any>;

type TFilterFn = (node: TNode, deep: number) => boolean;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

const defaultConfig = {
  childrenKey: 'children',
};

/**
 * 树查找，返回第一个匹配的节点包含子节点
 * @param {array} treeData 树结构数据
 * @param {function} filterFn 操作方法，参数为节点数据和节点深度；匹配返回真值的节点
 * @param {object} config 配置
 * @member {string} config.childrenKey 子节点 `key`；默认 `children`
 */
function treeMatch(treeData: TNode[], filterFn: TFilterFn, config?: TConfig): TNode[] {
  // 基础条件：空树直接返回空数组
  if (!treeData || !treeData.length) return [];

  const forEachConfig = Object.assign({}, defaultConfig, config);

  const result: TNode[] = [];

  treeForEach(
    treeData,
    (node: TNode, deep: number) => {
      const keep = filterFn(node, deep);
      if (!!keep) result.push({ ...node }); // 符合条件则加入结果数组
    },
    forEachConfig,
  );

  return result;
}

export default treeMatch;
