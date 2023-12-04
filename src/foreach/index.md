---
nav: 方法
---

# forEach

```jsx
import React from'react';
import { delay, forEachPromised, promiseForEach } from'@ihccc/utils';

function Demo () {

  React.useEffect(() => {
    forEachPromised([1, 2, 3], async (item, index) => {
      await delay(1000 * (index + 1));
      console.log('forEachPromised:', item, index);
      return item + index;
    }).then((res) => {
      // res => [1, 3, 5]
      console.log('forEachPromised done:', res);
    });

    const array = [
      async () => {
        await delay(1000);
        return 1;
      },
      async () =>  {
        await delay(2000);
        return 2;
      },
      async () =>  {
        await delay(3000);
        return 3;
      }
    ];
    promiseForEach(array, (item, index) => {
      console.log('promiseForEach:', item, index);
      return item + index;
    }).then((res) => {
      // res => [1, 3, 5]
      console.log('promiseForEach done:', res);
    });
  }, []);

  return null;
}

export default Demo;
```
