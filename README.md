# utils

ataola's utils: maybe publish a feature one week, to record something i think or meet.

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="Software License" />
  </a>
  <a href="https://www.npmjs.com/package/@ataola/utils">
    <img src="https://img.shields.io/npm/v/@ataola/utils.svg?style=flat-square" alt="Packagist" />
  </a>
  <a href="https://travis-ci.com/github/ataola/utils" target="_blank" rel="noopener noreferrer">
    <img alt="Travis CI" src="https://img.shields.io/travis/ataola/utils.svg">
  </a>
  <a href="https://codecov.io/gh/ataola/utils" target="_blank" rel="noopener noreferrer">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/ataola/utils.svg">
  </a>
</p>

## Introduction

[site](https://zhengjiangtao.cn/utils)|[docs](./docs/index.md)

## Installation

```bash
npm i @ataola/utils --save
```

## Usage

### es module

```javascript
import * as utils from '@ataola/utils';

utils.getVersion();
```

```javascript
import { getVersion } from '@ataola/utils';
console.log(getVersion());
```

### commonjs

command:

```bash
npm init -y
npm i esm @ataola/utils --save
```

for example:

```javascript
const utils = require('@ataola/utils');
console.log(utils);
```

```javascript
const { getVersion } = require('@ataola/utils');
console.log(getVersion());
```

package.json

```json
...
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "esm": "node -r esm index.js"
  },
...
```
