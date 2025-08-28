import React from 'react';
import MdTable from '../../components/md-table';
import { decimal } from '@ihccc/utils';

// 测试数据
const data = [
  [],
  [null],
  ['abc'],
  ['abc', 2],
  ['123', 2],
  ['2.495432'],
  ['2.495432', 0],
  ['2.495432', 3],
  ['2.495432', 2],
  ['2.495432', 1],
  [1.542, -2],
  [1.542, 0],
  [1.542, 2],
];

// 运行期望值
const hopes = [0, 0, 0, 0, 123, 2.495432, 2, 2.495, 2.5, 2.5, 1.542, 2, 1.54];

// 表格配置
const columns = [
  { title: '运行', render: ({ item }) => <code>decimal(...{JSON.stringify(item)})</code> },
  { title: '结果', render: ({ result }) => <code>{JSON.stringify(result)}</code> },
  {
    title: '期望',
    render: ({ result, index }) => {
      const passed = hopes[index] === result;
      return <span style={{ color: passed ? 'green' : 'red' }}>{passed ? '通过' : '未通过'}</span>;
    },
  },
];

const TestTable = () => {
  return <MdTable columns={columns} data={data} rowEmit={(item) => decimal(...item)} />;
};

export default TestTable;
