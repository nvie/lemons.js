v1.4.0
------
* **Breaking changes:**

  - Removed `Result.toMaybe()` - this method wasn’t commonly used, but pulled
    in `Maybe` into compiled bundles, increasing its size.

* **New features:**

  - You can now directly import submodules of this package, for example:
    
        // Previously
        import { Result, Ok, Err } from 'lemons';

        // Now possible
        import Result, { Ok, Err } from 'lemons/Result';
        //                               ^^^^^^^^^^^^^
    
    Note that, when importing from the specific modules directly, you'll need to
    make the main class (in this case `Result`) a _default_ import instead of
    a named import.

* **Misc:**

  - New build process
  - Cleaner/smaller package output


v1.3.1
------
- Add TypeScript support


v1.2.0
------
- Drop support for Node 7


v1.1.1
------
- Make lemons.js fully [Flow Strict](https://flow.org/en/docs/strict/)


v1.1.0
------
- Add convenience `LazyResult.value()`


v1.0.1
------
- Upgrade dependencies


v1.0.0
------
- First stable release

