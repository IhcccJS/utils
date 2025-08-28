type TNode = Record<string, any>;

type TCallback = (node: TNode, depth: number) => boolean | void;

type TConfig = {
  deep: number;
  childrenKey: string;
};

function treeForEachBfs(treeData: TNode[], callback: TCallback, config: TConfig) {
  const { deep, childrenKey } = config;

  const queue = treeData.map((node) => ({ node, depth: deep }));
  while (queue.length > 0) {
    const { node, depth } = queue.shift() as { node: TNode; depth: number };
    const next = callback(node, depth);
    if (next === false) break;
    if (node[childrenKey]) {
      queue.push(...node[childrenKey].map((node: TNode) => ({ node, depth: depth + 1 }))); // 子节点顺序入队
    }
  }
}

export default treeForEachBfs;
