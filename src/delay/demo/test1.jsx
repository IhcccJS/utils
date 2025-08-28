import React from 'react';
import { delay } from '@ihccc/utils';

function Demo() {
  const [output, setOutput] = React.useState(['> ']);

  const run0 = async () => {
    setOutput(['> ']);
    await delay(500);
    setOutput((o) => o.concat('HELLO :-)'));
  };

  const run1 = async () => {
    setOutput(['> ']);
    await delay(1000);
    setOutput((o) => o.concat('HELLO :-)'));
  };

  const run2 = async () => {
    setOutput(['> ']);
    await delay(2000);
    setOutput((o) => o.concat('HELLO :-)'));
  };

  const run3 = async () => {
    setOutput(['> ']);
    await delay(500);
    setOutput((o) => o.concat('H'));
    await delay(200);
    setOutput((o) => o.concat('E'));
    await delay(1000);
    setOutput((o) => o.concat('L'));
    await delay(1500);
    setOutput((o) => o.concat('L'));
    await delay(2000);
    setOutput((o) => o.concat('O'));
    await delay(800);
    setOutput((o) => o.concat(' :-)'));
    for (let i = 0; i < 5; i++) {
      await delay(200);
      setOutput(['> ']);
      await delay(500);
      setOutput(['> HELLO :-)']);
    }
  };

  return (
    <div>
      <button onClick={run0}>延时 0.5 秒运行</button>
      <button onClick={run1}>延时 1 秒运行</button>
      <button onClick={run2}>延时 2 秒运行</button>
      <button onClick={run3}>输出</button>
      {!!output && <div style={{ padding: 4, background: '#000', color: '#fff', height: 30 }}>{output.join('')}</div>}
    </div>
  );
}

export default Demo;
