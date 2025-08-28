import treeForEach from '../tree-for-each';

type TNode = Record<string, any>;

type TConfig = {
  /** 默认树深度 */
  deep?: number;
  /** 子树字段值 */
  childrenKey?: string;
};

const defaultConfig = {
  childrenKey: 'children',
};

function treeToArray(treeData: TNode[], config?: TConfig): TNode[] {
  // 基础条件：空树直接返回空数组
  if (!treeData || !treeData.length) return [];

  const cfg = Object.assign({}, defaultConfig, config);

  const result: TNode[] = [];

  treeForEach(
    treeData,
    (node: TNode) => {
      const item = { ...node };
      delete item[cfg.childrenKey];
      result.push(item);
    },
    cfg,
  );

  return result;
}

export default treeToArray;
