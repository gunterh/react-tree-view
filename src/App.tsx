import * as React from 'react';
import './styles.css';
import { TreeView } from './TreeView';

// const nodes = () =>
//   new Array(50).fill(null).map((n, index) => ({
//     id: '' + index,
//     title: 'Node ' + index,
//   }));

const nodes = [
  {
    id: '1',
    title: 'Node 1',
    nodes: [
      {
        id: '2',
        title: 'Node 2',
        nodes: [
          {
            id: '3',
            title: 'Node 3',
            nodes: [
              {
                id: '6',
                title: 'Node 6',
                nodes: [
                  {
                    id: '7',
                    title: 'Node 7',
                  },
                  {
                    id: '8',
                    title: 'Node 8',
                  },
                ],
              },
            ],
          },
          {
            id: '4',
            title: 'Node 4',
          },
        ],
      },
      {
        id: '9',
        title: 'Node 9',
      },
    ],
  },
  {
    id: '5',
    title: 'Noode 5',
  },
];

export default function App() {
  return (
    <>
      <h1>Treeview</h1>
      <TreeView nodes={nodes} />
    </>
  );
}
