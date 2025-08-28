import bfs from './bfs';
import dfs from './dfs';

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

const defaultConfig = {
  mode: 'BFS',
  deep: 0,
  childrenKey: 'children',
};

/**
 * 树查找，返回第一个匹配的节点包含子节点
 * @param {array} treeData 树结构数据
 * @param {function} callback 回调方法，参数为节点数据和节点深度
 * @param {object} config 配置
 * @member {string} config.mode `BFS` 广度优先搜索，`DFS` 深度优先搜索；默认 `BFS`
 * @member {number} config.deep 根节点默认深度；默认 `0`
 * @member {string} config.childrenKey 子节点 `key`；默认 `children`
 */
function treeForEach(treeData: TNode[], callback: TCallback, config?: TConfig): void {
  // 基础条件：空树直接返回空数组
  if (!treeData || !treeData.length) return;

  const { mode, ...cfg } = Object.assign({}, defaultConfig, config);

  if (mode === 'BFS') bfs(treeData, callback, cfg);
  if (mode === 'DFS') dfs(treeData, callback, cfg);
}

export default treeForEach;
