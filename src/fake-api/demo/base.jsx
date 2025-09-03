
import React from 'react';
import { FakeApi } from '@ihccc/utils';

const rowKey = 'name';

// 初始数据
const initData = [
  { name: '张三', sex: '1', score: 80 },
  { name: '李四', sex: '1', score: 90 },
];
// 实例化一个功能
const users = new FakeApi(initData, {
  queryType: { name: 'is' },
  key: rowKey,
  timeout: [100, 600],
  debug: true,
});

window.users = users;

function Demo() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const fetch = React.useCallback(async () => {
    // 查询列表
    setLoading(true);
    const result = await users.query();
    setLoading(false);
    setData(result);
  }, []);

  const profile = React.useCallback(async (key) => {
    // 查询详情
    setLoading(true);
    const result = await users.profile({ [rowKey]: key });
    setLoading(false);
    setData(result);
  }, []);

  const remove = React.useCallback(async (key) => {
    // 删除
    setLoading(true);
    const result = await users.remove({ [rowKey]: key });
    setLoading(false);
    setData(result);
  }, []);

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button disabled={loading} onClick={fetch}>
          {loading ? '刷新中...' : '刷新列表'}
        </button>
        {data?.data?.list?.map((item) => (
          <button
            disabled={loading}
            onClick={() => profile(item[rowKey])}
            key={item[rowKey] + 'profile'}
          >
            查询{item.name}详情 {loading && '中...'}
          </button>
        ))}
        {data?.data?.list?.map((item) => (
          <button
            type="primary"
            disabled={loading}
            onClick={() => remove(item[rowKey])}
            key={item[rowKey] + 'del'}
          >
            删除 {item.name} {loading && '中...'}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {loading ? (
          '加载中...'
        ) : (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default Demo;
