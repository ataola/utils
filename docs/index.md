# Document

## API

### getVersion

**examples:**

```javascript
import { getVersion } from '@ataola/utils';
console.log(getVersion());
```

### Cookies

#### keys()

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.keys(); // []
```

#### getItem(key)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.getItem('name'); // null
```

#### hasItem(key)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.hasItem('name'); // false
```

#### removeItem(key, path, domain)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.removeItem('name'); // false
```

#### setItem(key, value, end, path, domain, secure)

```javascript
import { cookies } from '@ataola/utils';
const value = cookies.setItem('name', 'ataola'); // true
```
