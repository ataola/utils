# url


### `getQueryParameters(url)`

```javascript
import { getQueryParameters } from '@ataola/utils';
console.log(getQueryParameters('https://www.baidu.com/s?wd=ataola&rsv_spt=1&rsv_iqid=0xe221028e0004da33&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=6&rsv_sug1=5&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=1050&rsv_sug4=1050'))

// {
//   wd: 'ataola',
//   rsv_spt: '1',
//   rsv_iqid: '0xe221028e0004da33',
//   issp: '1',
//   f: '8',
//   rsv_bp: '1',
//   rsv_idx: '2',
//   ie: 'utf-8',
//   tn: 'baiduhome_pg',
//   rsv_enter: '1',
//   rsv_dl: 'tb',
//   rsv_sug3: '6',
//   rsv_sug1: '5',
//   rsv_sug7: '100',
//   rsv_sug2: '0',
//   rsv_btype: 'i',
//   inputT: '1050',
//   rsv_sug4: '1050'
// }
```

### `getQueryParametersByRegExp(url)`

```javascript
import { getQueryParametersByRegExp } from '@ataola/utils';
console.log(getQueryParametersByRegExp('https://www.baidu.com/s?wd=ataola&rsv_spt=1&rsv_iqid=0xe221028e0004da33&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=6&rsv_sug1=5&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=1050&rsv_sug4=1050'))

// {
//   wd: 'ataola',
//   rsv_spt: '1',
//   rsv_iqid: '0xe221028e0004da33',
//   issp: '1',
//   f: '8',
//   rsv_bp: '1',
//   rsv_idx: '2',
//   ie: 'utf-8',
//   tn: 'baiduhome_pg',
//   rsv_enter: '1',
//   rsv_dl: 'tb',
//   rsv_sug3: '6',
//   rsv_sug1: '5',
//   rsv_sug7: '100',
//   rsv_sug2: '0',
//   rsv_btype: 'i',
//   inputT: '1050',
//   rsv_sug4: '1050'
// }
```

### `getQueryParameterByRegExp(url, name)`

```javascript
import { getQueryParameterByRegExp } from '@ataola/utils';

console.log(getQueryParameterByRegExp('https://www.baidu.com/s?wd=ataola&rsv_spt=1&rsv_iqid=0xe221028e0004da33&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=6&rsv_sug1=5&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=1050&rsv_sug4=1050', 'wd')) // 'ataola'

```
