---
nav:
  title: 方法
  order: 2
title: loadCss & loadScript
group:
  title: Promise 方法
  order: 2
---

# loadCss & loadScript

加载静态资源，不会重复加载

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

### API

```ts
function loadCss (path: string): Promise<unknown> | undefined;
function loadScript (path: string): Promise<unknown> | undefined;
```

| 参数 | 类型     | 默认值 | 描述     |
| ---- | -------- | ------ | -------- |
| path | `string` | -      | 资源路径 |
