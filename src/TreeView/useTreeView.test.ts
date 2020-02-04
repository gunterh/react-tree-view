import {
  transformNodesFromArrayToMap,
  transformFromMapToArray,
  TreeNode,
  TreeNodes,
} from './useTreeView';

const nodesArray: TreeNode[] = [
  {
    id: '1',
    title: 'Node 1',
    checkValue: 'indeterminate',
    nodes: [
      {
        id: '2',
        title: 'Node 2',
        checkValue: 'indeterminate',
        nodes: [
          {
            id: '3',
            title: 'Node 3',
            checkValue: 'none',
            nodes: [],
          },
          {
            id: '4',
            title: 'Node 4',
            checkValue: 'checked',
            nodes: [],
          },
        ],
      },
    ],
  },
];

const nodesMap: TreeNodes = {
  '1': {
    id: '1',
    title: 'Node 1',
    checkValue: 'indeterminate',
    children: ['2'],
    parentId: undefined,
  },
  '2': {
    id: '2',
    title: 'Node 2',
    checkValue: 'indeterminate',
    children: ['3', '4'],
    parentId: '1',
  },
  '3': {
    id: '3',
    title: 'Node 3',
    checkValue: 'none',
    parentId: '2',
    children: [],
  },
  '4': {
    id: '4',
    title: 'Node 4',
    checkValue: 'checked',
    parentId: '2',
    children: [],
  },
};

describe('transformNodesFromArrayToMap', () => {
  test.each`
    a                                 | expected
    ${[]}                             | ${{}}
    ${[{ id: '1', title: 'Node 1' }]} | ${{ 1: { id: '1', title: 'Node 1', checkValue: 'none', children: [] } }}
    ${nodesArray}                     | ${nodesMap}
  `('.transformNodesFromArrayToMap($a)', ({ a, expected }) => {
    expect(transformNodesFromArrayToMap(a)).toEqual(expected);
  });
});

describe('transformFromMapToArray', () => {
  test.each`
    a                                      | expected
    ${{}}                                  | ${[]}
    ${{ 1: { id: '1', title: 'Node 1' } }} | ${[{ id: '1', title: 'Node 1', nodes: [], checkValue: undefined }]}
    ${nodesMap}                            | ${nodesArray}
  `('.transformFromMapToArray($a)', ({ a, expected }) => {
    expect(transformFromMapToArray(a)).toEqual(expected);
  });
});
