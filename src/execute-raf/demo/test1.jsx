import React from 'react';
import executeRaf from '../index';

function Demo() {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState('idle');
  const [logs, setLogs] = React.useState([]);
  const executorRef = React.useRef(null);

  const handleStart = () => {
    setProgress(0);
    setStatus('running');
    setLogs([]);

    // 模拟大量数据处理
    const largeList = Array.from({ length: 10000 }, (_, i) => i);

    const { promise, cancel } = executeRaf(
      largeList,
      (item, index) => {
        // 模拟耗时操作
        const start = performance.now();
        while (performance.now() - start < 0.1) {
          // 模拟处理
        }

        if (index % 1000 === 0) {
          setProgress(Math.round(((index + 1) / largeList.length) * 100));
          setLogs((logs) => [...logs.slice(-5), `已处理 ${index + 1} 项`]);
        }
      },
      { frameTime: 8, minItemsPerFrame: 50 },
    );

    executorRef.current = { cancel };

    promise.then((result) => {
      setStatus(result.done ? 'done' : 'cancelled');
      setProgress(result.done ? 100 : Math.round((result.processed / largeList.length) * 100));
      if (result.done) {
        setLogs((logs) => [...logs, '处理完成!']);
      }
    });
  };

  const handleCancel = () => {
    if (executorRef.current) {
      executorRef.current.cancel();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={handleStart} disabled={status === 'running'}>
          开始处理 10000 项数据
        </button>
        <button onClick={handleCancel} disabled={status !== 'running'} style={{ marginLeft: 8 }}>
          取消
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            width: '100%',
            height: 20,
            backgroundColor: '#eee',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: status === 'cancelled' ? '#ff4d4f' : '#1890ff',
              transition: 'width 0.1s',
            }}
          />
        </div>
        <span>{progress}%</span>
        <span style={{ marginLeft: 8 }}>
          {status === 'running' && '处理中...'}
          {status === 'done' && '已完成'}
          {status === 'cancelled' && '已取消'}
        </span>
      </div>

      <div
        style={{
          padding: 8,
          background: '#f5f5f5',
          borderRadius: 4,
          maxHeight: 150,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 12,
        }}
      >
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default Demo;
