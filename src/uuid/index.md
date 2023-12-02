---
nav: 方法
---

# uuid

生成 id

```jsx
import uuid from '@ihccc/utils/uuid';

function Demo() {
  return (
    <div>
      <p>生成 10 个</p>
      <pre>
        <code>
          uuid() * 10:{' '}
          {JSON.stringify(
            new Array(10).fill(0).map(() => uuid()),
            null,
            2,
          )}
        </code>
      </pre>
      <p>修改前缀 uuid('key')：{uuid('key')}</p>
    </div>
  );
}

export default Demo;
```
