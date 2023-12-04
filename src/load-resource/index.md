---
nav: 方法
---

# loader

```jsx
import React from'react';
import { loadCss, loadScript } from'@ihccc/utils';

function Demo () {
  const loadRes = async () => {
    // await loadCss("/test.css");
    // await loadScript("/test.js");
  }

  return (
    <div>
      <p className="text">点击查看页面元素是否加载完成，以及重复加载情况</p>
      <button onClick={() => loadRes()}>点击加载</button>
    </div>
  );
}

export default Demo;
```
