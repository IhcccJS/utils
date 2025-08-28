type TNode = Record<string, any>;

type TCallback = (node: TNode, depth: number) => boolean | void;

type TConfig = {
  deep: number;
  childrenKey: string;
};

function treeForEachDfs(treeData: TNode[], callback: TCallback, config: TConfig) {
  const { deep, childrenKey } = config;

  const stack = treeData.map((node) => ({ node, depth: deep }));

  while (stack.length > 0) {
    const { node, depth } = stack.pop() as { node: TNode; depth: number };
    const next = callback(node, depth);
    if (next === false) break;
    // 子节点逆序入栈保证访问顺序
    if (node[childrenKey]) {
      for (let i = node[childrenKey].length - 1; i >= 0; i--) {
        stack.push({ node: node[childrenKey][i], depth: depth + 1 });
      }
    }
  }
}

export default treeForEachDfs;
