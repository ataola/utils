# Document

## API

### getVersion

**examples:**

```javascript
import { getVersion } from '@ataola/utils';
console.log(getVersion());
```

### [cookies](./cookies.md)

- `keys()`

- `get(key)`

- `has(key)`

- `remove(key, path, domain)`

- `set(key, value, end, path, domain, secure)`

### [element](./element.md)

- `getDOMRect(element)`

- `getPosition(element)`

### [generator](./generator.md)

- `randomSimple()`

### [judge](./judge.md)

- `isNull(value)`

- `isString(value)`

- `isNumber(value)`

- `isSymbol(value)`

- `isUndefined(value)`

- `isBoolean(value)`

- `isBigInt(value)`

- `isFunction(value)`

- `isArray(value)`

- `isObject(value)`

- `isPrototype(value)`

- `isMap(value)`

- `isWeakMap(value)`

- `isSet(value)`

- `isWeakSet(value)`

- `isError(value)`

- `isScreenXS()`

- `isScreenSM()`

- `isScreenMD()`

- `isScreenLG()`

- `isScreenXL()`

- `isEmpty(value)`

- `isDate(value)`

### [logger](./logger.md)

- `timing(name, cb)`

- `timeConsuming(cb)`

### [url](./url.md)

- `getQueryParameters(url)`

- `getQueryParametersByRegExp(url)`

- `getQueryParameterByRegExp(url, name)`

### [data](./data.md)

- `deepFreeze(obj)`

### [num](./num.md)

- `formatMoney(num)`

### [color](./color.md)

- `toHEX(rgb)`
## [八股文](./baguwen.md)

- `curry(fn, ...args)`

