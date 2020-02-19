[![npm](https://img.shields.io/npm/v/lemons.svg)](https://www.npmjs.com/package/lemons)
[![Build Status](https://github.com/nvie/lemons.js/workflows/test/badge.svg)](https://github.com/nvie/lemons.js/actions)
[![Coverage Status](https://img.shields.io/coveralls/nvie/lemons.js/master.svg)](https://coveralls.io/github/nvie/lemons.js?branch=master)
[![Minified Size](https://badgen.net/bundlephobia/minzip/lemons)](https://bundlephobia.com/result?p=lemons)

🍋 Common algebraïc data types for JavaScript, 'cause when life hands you lemons...

## Maybe

Pseudo-type:

    type Maybe<T>
        = Just T
        | Nothing

Usage example:

```javascript
import Maybe, { Just, Nothing } from 'lemons/Maybe';
// or: import { Maybe, Just, Nothing } from 'lemons';

const r1: Maybe<number> = Just(42);
r1.isJust()         // => true
r1.isNothing()      // => false
r1.withDefault(99)  // => 42
r1.unwrap()         // => 42
r1.expect('Foo')    // => 42

const r2: Maybe<number> = Nothing();
r2.isJust()         // => false
r2.isNothing()      // => true
r2.withDefault(99)  // => 99
r2.unwrap()         // throws Error('Cannot unwrap a Nothing')
r2.expect('Foo')    // throws Error('Foo')
```


## Result

Pseudo-type:

    type Result<E, T>
        = Ok T
        | Err E

Usage example:

```javascript
import Result, { Ok, Err } from 'lemons/Result';
// or: import { Result, Ok, Err } from 'lemons';

const r1: Result<string, number> = Ok(42);
r1.isOk()           // => true
r1.isErr()          // => false
r1.withDefault(99)  // => 42
r1.unwrap()         // => 42

const r2: Result<string, number> = Err('Oops');
r2.isOk()           // => false
r2.isErr()          // => true
r2.withDefault(99)  // => 99
r2.unwrap()         // throws 'Oops'
```


## LazyResult

Pseudo-type:

    type LazyResult<E, T>
        = Initial
        | Loading
        | Failure E
        | Success T

Useful for state management that typically has an initial, loading, and
a failure/success outcome state, like page loading, or submitting a form.  The
following example shows how you would use the LazyResult as part of a React
app, but since ADTs are simple data structures, they work with any technology.

Annotated usage example:

![How to use LazyResult in real apps](./lazyresult-example-usage.png)
