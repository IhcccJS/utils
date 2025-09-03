import React from 'react';
import MdTable from '../../components/md-table';
import { random } from '@ihccc/utils';

const data = [[10], [20, 100], [['0', '1', '2']], [50, 100, 2], [50, 100, 5], [-100, -50], [-100, -50, 1]];

// const hopes = [false, false, false, true, true, true];

const columns = [
  { title: '运行', render: ({ item }) => <code>random(...{JSON.stringify(item)})</code> },
  { title: '结果', render: ({ result }) => <code>{JSON.stringify(result)}</code> },
  // {
  //   title: '期望',
  //   render: ({ result, index }) => {
  //     const passed = hopes[index] === result;
  //     return <span style={{ color: passed ? 'green' : 'red' }}>{passed ? '通过' : '未通过'}</span>;
  //   },
  // },
];

const TestTable = () => {
  return <MdTable columns={columns} data={data} rowEmit={(item) => random(...item)} />;
};

export default TestTable;
