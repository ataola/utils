#  judge

### isNull(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isNull(null)) // true
```

### isString(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isString('peace world')) // true
```

### isNumber(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isNumber(2020)) // true
```

### isSymbol(value)

```javascript
import { judge } from '@ataola/utils';
const foo = Symbol('foo');
console.log(judge.isSymbol(foo)) // true
```

### isUndefined(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.sUndefined(undefined)) // true
```

### isBoolean(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isBoolean(true)) // true
```

### isBigInt(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isBigInt(2020n)) // true
```

### isFunction(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isFunction(() => {}))) // true
```

### isArray(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isArray([])) // true
```

### isObject(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isObject({})) // true
```

### isPrototype(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isPrototype(Date.prototype)) // true
```

### isMap(value)

```javascript
import { judge } from '@ataola/utils';
const map = new Map();
console.log(judge.isMap(map)) // true
```

### isWeakMap(value)

```javascript
import { judge } from '@ataola/utils';
const weakMap = new WeakMap();
console.log(judge.isWeakMap(weakMap)) // true
```

### isSet(value)

```javascript
import { judge } from '@ataola/utils';
const set = new Set();
console.log(judge.isSet(set)) // true
```

### isWeakSet(value)

```javascript
import { judge } from '@ataola/utils';
const weakSet = new WeakSet();
console.log(judge.isWeakSet(weakSet)) // true
```

### isError(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isError(new Error())) // true
```

### isScreenXS

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isScreenXS()) // false
```

### isScreenSM()

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isScreenSM()) // true
```

### isScreenMD()

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isScreenMD()) // true
```

### isScreenLG()

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isScreenLG()) // true
```

### isScreenXL()

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isScreenXL()) // true
```

### isEmpty(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isEmpty(null)) // true
```

### isDate(value)

```javascript
import { judge } from '@ataola/utils';
console.log(judge.isDate(Date.now())) // true
```
