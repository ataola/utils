# logger

## timeConsumingSync(fn, ...args)

```javascript
import { timeConsumingSync } from '@ataola/utils';

function makeBaby(n) {
  for (let i = 0; i < n; i++) {
    console.log(`the ${i}th baby was born.\n`)
  }
}

timeConsumingSync(makeBaby, 20);

// the 0th baby was born.

// the 1th baby was born.

// the 2th baby was born.

// the 3th baby was born.

// the 4th baby was born.

// the 5th baby was born.

// the 6th baby was born.

// the 7th baby was born.

// the 8th baby was born.

// the 9th baby was born.

// the 10th baby was born.

// the 11th baby was born.

// the 12th baby was born.

// the 13th baby was born.

// the 14th baby was born.

// the 15th baby was born.

// the 16th baby was born.

// the 17th baby was born.

// the 18th baby was born.

// the 19th baby was born.

// e28gc1ud0m8-time-cost: 1.174072265625 ms
```
