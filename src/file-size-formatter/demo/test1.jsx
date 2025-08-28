import React from 'react';
import MdTable from '../../components/md-table';
import { fileSizeFormatter } from '@ihccc/utils';

// 测试数据
const data = [
  null,
  '',
  -100,
  'abcd',
  '1234',
  1,
  12,
  123,
  1234,
  123456,
  1234567,
  12345678,
  123456789,
  1234567890,
  3456789012,
  34567890123,
  345678901234,
  3456789012345,
  34567890123456,
  345678901234567,
  3456789012345678,
  '34567890123456789',
  '345678901234567890',
  '3456789012345678901',
  '34567890123456789012',
];

// 运行期望值
const hopes = [
  '0 B',
  '0 B',
  '0 B',
  '0 B',
  '1.21 KB',
  '1.00 B',
  '12.0 B',
  '123 B',
  '1.21 KB',
  '121 KB',
  '1.18 MB',
  '11.8 MB',
  '118 MB',
  '1.15 GB',
  '3.22 GB',
  '32.2 GB',
  '322 GB',
  '3.14 TB',
  '31.4 TB',
  '314 TB',
  '3.07 PB',
  '30.7 PB',
  '307 PB',
  '3.00 EB',
  '30.0 EB',
];

// 表格配置
const columns = [
  { title: '运行', render: ({ item }) => <code>fileSizeFormatter({JSON.stringify(item)})</code> },
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
  return <MdTable columns={columns} data={data} rowEmit={(item) => fileSizeFormatter(item)} />;
};

export default TestTable;
