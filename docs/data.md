# data

## deepFreeze(obj)

```javascript
import { data } from '@ataola/utils';
const obj = { a : 1 };
data.deepFreeze(obj);
obj.b = 1;
console.log(obj.b) // undefined
```
