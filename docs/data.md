# data

## deepFreeze(obj)

```javascript
import { data } from '@ataola/utils';
const obj = { a : 1 };
data.deepFreeze(obj);
obj.b = 1;
console.log(obj.b) // undefined
```

## cloneDeep(obj)

```javascript
const arr = [{ x: 1 }, { x: 2 }];
const newArr = cloneDeep(arr);
newArr[0].x = 100;
```
