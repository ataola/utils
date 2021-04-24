#  judge

### `isNull(value)`

```javascript
import { isNull } from '@ataola/utils';
console.log(isNull(null)) // true
```

### `isString(value)`

```javascript
import { isString } from '@ataola/utils';
console.log(isString('peace world')) // true
```

### `isNumber(value)`

```javascript
import { isNumber } from '@ataola/utils';
console.log(isNumber(2020)) // true
```

### `isSymbol(value)`

```javascript
import { isSymbol } from '@ataola/utils';
const foo = Symbol('foo');
console.log(isSymbol(foo)) // true
```

### `isUndefined(value)`

```javascript
import { isUndefined } from '@ataola/utils';
console.log(isUndefined(undefined)) // true
```

### `isBoolean(value)`

```javascript
import { isBoolean } from '@ataola/utils';
console.log(isBoolean(true)) // true
```

### `isBigInt(value)`

```javascript
import { isBigInt } from '@ataola/utils';
console.log(isBigInt(2020n)) // true
```

### `isFunction(value)`

```javascript
import { isFunction } from '@ataola/utils';
console.log(isFunction(() => {}))) // true
```

### `isArray(value)`

```javascript
import { isArray } from '@ataola/utils';
console.log(isArray([])) // true
```

### `isObject(value)`

```javascript
import { isObject } from '@ataola/utils';
console.log(isObject({})) // true
```

### `isPrototype(value)`

```javascript
import { isPrototype } from '@ataola/utils';
console.log(isPrototype(Date.prototype)) // true
```

### `isMap(value)`

```javascript
import { isMap } from '@ataola/utils';
const map = new Map();
console.log(isMap(map)) // true
```

### `isWeakMap(value)`

```javascript
import { isWeakMap } from '@ataola/utils';
const weakMap = new WeakMap();
console.log(isWeakMap(weakMap)) // true
```

### `isSet(value)`

```javascript
import { isSet } from '@ataola/utils';
const set = new Set();
console.log(isSet(set)) // true
```

### `isWeakSet(value)`

```javascript
import { isWeakSet } from '@ataola/utils';
const weakSet = new WeakSet();
console.log(isWeakSet(weakSet)) // true
```

### `isError(value)`

```javascript
import { isError } from '@ataola/utils';
console.log(isError(new Error())) // true
```

### `isScreenXS`

```javascript
import { isScreenXS } from '@ataola/utils';
console.log(isScreenXS()) // false
```

### `isScreenSM()`

```javascript
import { isScreenSM } from '@ataola/utils';
console.log(isScreenSM()) // true
```

### `isScreenMD()`

```javascript
import { isScreenMD } from '@ataola/utils';
console.log(isScreenMD()) // true
```

### `isScreenLG()`

```javascript
import { isScreenLG } from '@ataola/utils';
console.log(isScreenLG()) // true
```

### `isScreenXL()`

```javascript
import { isScreenXL } from '@ataola/utils';
console.log(isScreenXL()) // true
```

### `isEmpty(value)`

```javascript
import { isEmpty } from '@ataola/utils';
console.log(isEmpty(null)) // true
```

### `isDate(value)`

```javascript
import { isDate } from '@ataola/utils';
console.log(isDate(Date.now())) // true
```