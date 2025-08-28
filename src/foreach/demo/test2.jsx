import React from 'react';
import { promiseForEach, delay } from '@ihccc/utils';

let initNum = 0;
const task = async (num) => {
  await delay(800);
  initNum += num;
  return initNum;
};

function Demo() {
  const [output, setOutput] = React.useState('点击运行');

  const run0 = async () => {
    const result = await promiseForEach([() => task(2), () => task(6), () => task(17)], (res, i) => {
      setOutput(`当前运行到第${i + 1}步，结果是：${res}`);
      return res;
    });
    await delay(3000);
    setOutput(`运行完毕，各阶段结果是：${JSON.stringify(result)}`);
    console.log(result);
  };

  return (
    <div>
      <div>{output}</div>
      <button onClick={run0}>运行</button>
    </div>
  );
}

export default Demo;
