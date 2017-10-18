// @flow

/**
 * Result error value
 *     = Ok value
 *     | Err error
 */

const Ok = 'Ok';
const Err = 'Err';

// prettier-ignore
opaque type _ResultT<E, T> =
    | { type: typeof Err, error: E }
    | { type: typeof Ok, value: T };

/**
 * Represents a union type that's either a legit value or an error:
 *
 *     Result error value
 *         = Ok value
 *         | Err error
 *
 */
export default class Result<E, T> {
    _r: _ResultT<E, T>;

    /**
     * **Do not call this constructor directly!**  Use either `Result.ok()` or
     * `Result.err()` to construct a new Result instance.
     */
    constructor(r: _ResultT<E, T>) {
        this._r = r;
    }

    /**
     * Create a new Result instance representing a successful computation.
     */
    static ok(value: T): Result<E, T> {
        return new Result({ type: Ok, value });
    }

    /**
     * Create a new Result instance representing a failed computation.
     */
    static err(error: E): Result<E, T> {
        return new Result({ type: Err, error });
    }

    isOk(): boolean {
        return this._r.type === Ok;
    }

    isErr(): boolean {
        return this._r.type === Err;
    }

    withDefault(defaultValue: T): T {
        const r = this._r;
        if (r.type === Ok) {
            return r.value;
        } else {
            return defaultValue;
        }
    }

    toMaybe(): void | T {
        const r = this._r;
        if (r.type === Ok) {
            return r.value;
        } else {
            return undefined;
        }
    }

    /**
     * Unwrap the value from this Result instance if this is an "Ok" result.
     * Otherwise, will throw the "Err" error via a runtime exception.
     */
    unwrap(): T {
        const r = this._r;
        if (r.type === Ok) {
            return r.value;
        } else {
            throw r.error;
        }
    }

    dispatch<O>(errCallback: E => O, okCallback: T => O): O {
        const r = this._r;
        return r.type === Ok ? okCallback(r.value) : errCallback(r.error);
    }
}
