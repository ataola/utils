# Cookies

## keys()

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.keys(); // []
```

## get(key)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.get('name'); // null
```

## has(key)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.has('name'); // false
```

## remove(key, path, domain)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.remove('name'); // false
```

## set(key, value, end, path, domain, secure)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.set('name', 'ataola'); // true
```
