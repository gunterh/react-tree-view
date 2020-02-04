import React from 'react';
import { TreeNode, useTreeView } from './useTreeView';
import styled from 'styled-components';

interface TreeViewProps {
  nodes: TreeNode[];
}

const Flex = styled.li`
  display: flex;
`;

export const TreeView = ({ nodes: initialNodes }: TreeViewProps) => {
  const { nodes, setNodeValue } = useTreeView(initialNodes);
  const handleChange = (id: string, checked: boolean) => () => {
    setNodeValue(id, checked);
  };

  const renderChildren = (nodes: TreeNode[]) => {
    return (
      <ul>
        {nodes.map(n => (
          <React.Fragment key={n.id}>
            <Flex>
              <div>{n.title}</div>
              <input
                type="checkbox"
                checked={n.checkValue === 'checked'}
                onChange={handleChange(n.id, !(n.checkValue === 'checked'))}
              />
              {n.checkValue === 'indeterminate' && <div>indeterminate</div>}
            </Flex>
            {renderChildren(n.nodes)}
          </React.Fragment>
        ))}
      </ul>
    );
  };

  return (
    <ul>
      {nodes.map(n => (
        <React.Fragment key={n.id}>
          <Flex>
            <div>{n.title}</div>
            <input
              type="checkbox"
              checked={n.checkValue === 'checked'}
              onChange={handleChange(n.id, !(n.checkValue === 'checked'))}
            />
            {n.checkValue === 'indeterminate' && <div>indeterminate</div>}
          </Flex>
          {renderChildren(n.nodes)}
        </React.Fragment>
      ))}
    </ul>
  );
};
