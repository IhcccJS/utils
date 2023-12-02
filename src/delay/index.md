---
nav: 方法
---

# delay

延迟方法 setTimeout 的 Promise 版

```js
import delay from '@ihccc/utils/delay';

async function req() {
  await delay(2000);
  console.log('两秒钟后打印！');
}

req();
```
