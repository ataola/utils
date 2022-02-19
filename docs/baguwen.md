# 八股文

## curry


```javascript
import { curry } from '@ataola/utils';
function add(a, b, c) {
  return a + b + c;
}
const addCurrry = curry(add);
const value = addCurry(1)(2)(3) // 6
```
