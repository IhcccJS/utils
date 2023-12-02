---
nav: 方法
---

# types

数据类型校验

```jsx
import {
  isNull,
  isUndefined,
  isBoolean,
  isNumber,
  isString,
  isArray,
  isObject,
  isFunction,
  isSymbol,
} from '@ihccc/utils/types';

function Demo() {
  return (
    <div>
      <p>
        isNull(null)：{isNull(null)}，isNull(undefined)：{isNull(undefined)}
      </p>
      <p>
        isUndefined(undefined)：{isUndefined(undefined)}，isUndefined(null)：
        {isUndefined(null)}
      </p>
      <p>
        isBoolean(false)：{isBoolean(false)}，isBoolean(0)：{isBoolean(0)}
      </p>
      <p>
        isNumber(12)：{isNumber(12)}，isNumber(NaN)：{isNumber(NaN)}
      </p>
      <p>
        isString('12')：{isString('12')}，isString(12)：{isString(12)}
      </p>
      <p>
        isArray([])：{isArray([])}，isArray({})：{isArray({})}
      </p>
      <p>
        isObject({})：{isObject({})}，isObject([])：{isObject([])}
        ，isObject(null)：{isObject(null)}
      </p>
      <p>
        isFunction(() => {})：{isFunction(() => {})}，isFunction(class {})：
        {isFunction(class {})}
      </p>
    </div>
  );
}

export default Demo;
```
