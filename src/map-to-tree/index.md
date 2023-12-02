---
nav: 方法
---

# mapToTree

一维数据转成树结构数据

```jsx
import mapToTree from './index.ts';

function Aoi() {
  const data = [
    {
      name: '5',
      key: '5',
      id: '5',
      pid: '0',
    },
    {
      name: '1',
      key: '1',
      id: '1',
      pid: '0',
    },
    {
      name: '3',
      key: '3',
      id: '3',
      pid: '1',
    },
    {
      name: '6',
      key: '6',
      id: '6',
      pid: '0',
    },
    {
      name: '2',
      key: '2',
      id: '2',
      pid: '1',
    },
  ];
  console.log(
    mapToTree(data, {
      id: 'id',
      pid: 'pid',
      rootid: ['0'],
      labelKey: 'name',
      valueKey: 'id',
      sort: (a, b) => a.key - b.key,
    }),
  );

  return <div>1111</div>;
}
export default Aoi;
```
