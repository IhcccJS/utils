import React from 'react';
import MdTable from '../../components/md-table';
import { isLngLat } from '@ihccc/utils';

const data = [
  null,
  {},
  { lng: '', lat: '' },
  { lng: '123', lat: '123' },
  { lng: '123.100', lat: '123.200' },
  { lng: 123.1023, lat: 32.43432 },
];

const hopes = [false, false, false, true, true, true];

const columns = [
  { title: '运行', render: ({ item }) => <code>isLngLat({JSON.stringify(item)})</code> },
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
  return <MdTable columns={columns} data={data} rowEmit={(item) => isLngLat(item)} />;
};

export default TestTable;
