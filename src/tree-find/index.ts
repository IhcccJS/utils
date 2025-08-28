import treeForEach from '../tree-for-each';

type TNode = Record<string, any>;

type TFindFn = (node: TNode) => boolean;

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
 * @param {function} findFn 查找方法，匹配返回真值的节点
 * @param {object} config 配置
 * @member {string} config.childrenKey 子节点 `key`；默认 `children`
 */
function treeFind(treeData: any[], findFn: TFindFn, config?: TConfig): TNode | null {
  // 基础条件：空树直接返回空数组
  if (!treeData || !treeData.length) return [];

  const forEachConfig = Object.assign({}, defaultConfig, config);

  let result = null;

  treeForEach(
    treeData,
    (node: any) => {
      const find = findFn({ ...node });
      if (!!find) {
        result = node;
        return false;
      }
    },
    forEachConfig,
  );

  return result;
}

export default treeFind;
