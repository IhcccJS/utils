import treeMap from '../tree-map';

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
 * 树过滤，返回匹配节点以及祖孙节点
 * @param {array} treeData 树结构数据
 * @param {object} config 配置
 * @member {string} config.childrenKey 子节点 `key`；默认 `children`
 */
function treeFilter(treeData: TNode[], filterFn: TFilterFn, config?: TConfig): TNode[] {
  // 基础条件：空树直接返回空数组
  if (!treeData || !treeData.length) return [];

  const cfg = Object.assign({}, defaultConfig, config);

  return treeMap(
    treeData,
    (node, deep) => {
      const keep = !!filterFn(node, deep);
      const { [cfg.childrenKey]: children, ...item } = node;
      if (keep === true) return item;
      if (!!children && children.length > 0) return node;
      return false;
    },
    cfg,
  );
}

export default treeFilter;
