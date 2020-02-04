import React from 'react';

export type CheckValue = 'none' | 'checked' | 'indeterminate';

export interface TreeNode {
  id: string;
  title: string;
  nodes?: TreeNode[];
  checkValue?: CheckValue;
}

export interface TreeNodes {
  [key: string]: {
    id: string;
    title: string;
    parentId?: string;
    children: string[];
    checkValue: CheckValue;
  };
}

export const transformNodesFromArrayToMap = (
  nodes: TreeNode[],
  parentId?: string,
): TreeNodes =>
  nodes.reduce((prev, curr) => {
    const resp = curr.nodes
      ? transformNodesFromArrayToMap(curr.nodes, curr.id)
      : {};
    return {
      ...prev,
      ...resp,
      [curr.id]: {
        id: curr.id,
        title: curr.title,
        children: curr.nodes ? curr.nodes.map(n => n.id) : [],
        checkValue: curr.checkValue || 'none',
        parentId,
      },
    };
  }, {});

export const transformFromMapToArray = (
  nodes: TreeNodes,
  parentId?: string,
): TreeNode[] => {
  const root = Object.values(nodes).filter((n: any) => n.parentId === parentId);
  return root.map((n: any) => ({
    id: n.id,
    title: n.title,
    checkValue: n.checkValue,
    nodes: transformFromMapToArray(nodes, n.id),
  }));
};

export const useTreeView = (
  initialNodes: TreeNode[],
): {
  nodes: TreeNode[];
  setNodeValue: (id: string, checked: boolean) => void;
} => {
  const [nodes, setNodes] = React.useState<TreeNodes>(
    transformNodesFromArrayToMap(initialNodes),
  );

  const setNodeValue = (id: string, checked: boolean) => {
    setNodes((currentNodes: TreeNodes) => {
      const updatedNodes = { ...currentNodes };

      const updateChildren = (id: string, checked: boolean) => {
        updatedNodes[id].children.forEach(childId => {
          const child = updatedNodes[childId];
          child.checkValue = checked ? 'checked' : 'none';
          updateChildren(child.id, checked);
        });
      };

      const updateParents = (id: string, checkValue: CheckValue) => {
        const node = updatedNodes[id];
        if (!node.parentId) {
          return;
        }
        const parent = updatedNodes[node.parentId];

        let checkedChildrenCount = parent.children.filter(
          childId =>
            updatedNodes[childId].checkValue === 'checked' &&
            updatedNodes[childId].id !== id,
        ).length;

        let indeterminateChildrenCount = parent.children.filter(
          childId =>
            updatedNodes[childId].checkValue === 'indeterminate' &&
            updatedNodes[childId].id !== id,
        ).length;

        if (checkValue === 'checked') {
          checkedChildrenCount += 1;
        }

        if (checkValue === 'indeterminate') {
          indeterminateChildrenCount += 1;
        }

        const newCheckValue =
          checkedChildrenCount === 0 && indeterminateChildrenCount === 0
            ? 'none'
            : checkedChildrenCount === parent.children.length
            ? 'checked'
            : 'indeterminate';
        parent.checkValue = newCheckValue;
        updateParents(node.parentId, newCheckValue);
      };

      const checkValue = checked ? 'checked' : 'none';
      updatedNodes[id].checkValue = checkValue;

      updateChildren(id, checked);

      updateParents(id, checkValue);

      return updatedNodes;
    });
  };

  return {
    nodes: transformFromMapToArray(nodes),
    setNodeValue,
  };
};
