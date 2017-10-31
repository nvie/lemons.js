[![npm](https://img.shields.io/npm/v/lemons.svg)](https://www.npmjs.com/package/lemons)
[![Build Status](https://img.shields.io/travis/nvie/lemons.js/master.svg)](https://travis-ci.org/nvie/lemons.js)
[![Coverage Status](https://img.shields.io/coveralls/nvie/lemons.js/master.svg)](https://coveralls.io/github/nvie/lemons.js?branch=master)

🍋 Common algebraïc data types for JavaScript, 'cause when life hands you lemons...

## `Result<d, e> = Err<e> | Ok<d>`

```javascript
import { Result, Ok, Err } from 'lemons';

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


## `LazyResult<d, e> = Initial | Loading | Failure<e> | Success<d>`

Useful for state management that typically has an initial, loading, and
a failure/success outcome state, like page loading, or submitting a form.  The
following example shows how you would use the LazyResult as part of a React
app, but since ADTs are simple data structures, they work with any technology.

```jsx
import { LazyResult, Initial, Loading, Failure, Success } from 'lemons';
import React from 'react';

// The page's success value is a list of todo items.  The page's failure value
// is any error we got when loading.
type Props = {};
type State = {
    items: LazyResult<Error, Array<TodoItem>>,
};

class TodoList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            items: Initial(),
        }
    }

    async componentDidMount() {
        this.setState({ items: Loading() });
        try {
            const data = await TodosAPI.getAll();
            this.setState({ items: Success(data) });
        } catch (e) {
            this.setState({ items: Failure(e) });
        }
    }

    render() {
        // How this component is rendered depends on the state it's in
        return this.state.items.dispatch(
            () => <div />,      // Blank page when loading hasn't started yet
            () => <Spinner />,  // Show a spinning animation when data is loaded
            err => (
                <div style={{ color: 'red' }}>
                    {err}
                </div>
            ),
            items => (
                <ul>
                    {items.map(item => <li key={item.key}>{item.title}</li>)}
                </ul>
            )
        );
    }
}
```
