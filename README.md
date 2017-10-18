[![npm](https://img.shields.io/npm/v/lemons.svg)](https://www.npmjs.com/package/lemons)
[![Build Status](https://img.shields.io/travis/nvie/lemons.js/master.svg)](https://travis-ci.org/nvie/lemons.js)
[![Coverage Status](https://img.shields.io/coveralls/nvie/lemons.js/master.svg)](https://coveralls.io/github/nvie/lemons.js?branch=master)

🍋 Common algebraïc data types for JavaScript, 'cause when life hands you lemons...

## Usage

```javascript
import { Result } from 'lemons';

const r1 = Result.ok(42);
r1.isOk()  // => true
r1.isErr()  // => false
r1.withDefault(99)  // => 42
r1.unwrap()  // => 42

const r2 = Result.err('Oops');
r2.isOk()  // => false
r2.isErr()  // => true
r2.withDefault(99)  // => 99
r2.unwrap()  // throws 'Oops'
```

## Docs will come soon

