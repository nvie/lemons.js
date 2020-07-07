// @flow strict

/**
 * Maybe value
 *     = Just value
 *     | Nothing
 */

const Just = 'Just';
const Nothing = 'Nothing';

// prettier-ignore
opaque type $MaybeT<T> =
    | { type: typeof Just, value: T }
    | { type: typeof Nothing };

/**
 * Represents a union type that's either a legit value or an error:
 *
 *     Maybe value
 *         = Just value
 *         | Nothing
 *
 */
export default class Maybe<T> {
    _m: $MaybeT<T>;

    /**
     * **Do not call this constructor directly!**  Use either `Maybe.just()` or
     * `Maybe.nothing()` to construct a new Maybe instance.
     */
    constructor(m: $MaybeT<T>) {
        this._m = m;
    }

    /**
     * Create a new Maybe instance representing a value.
     */
    static just(value: T): Maybe<T> {
        return new Maybe({ type: Just, value });
    }

    /**
     * Create a new Maybe instance representing no value.
     */
    static nothing(): Maybe<T> {
        return new Maybe({ type: Nothing });
    }

    toString(): string {
        const m = this._m;
        return m.type === Just ? `Just(${String(m.value)})` : 'Nothing';
    }

    isJust(): boolean {
        return this._m.type === Just;
    }

    isNothing(): boolean {
        return this._m.type === Nothing;
    }

    withDefault(defaultValue: T): T {
        const m = this._m;
        return m.type === Just ? m.value : defaultValue;
    }

    value(): void | T {
        const m = this._m;
        return m.type === Just ? m.value : undefined;
    }

    /**
     * Unwrap the value from this Maybe instance if this is a "Just" result.
     * Otherwise, will throw a runtime exception.
     */
    unwrap(): T {
        return this.expect('Cannot unwrap a Nothing');
    }

    expect(message: string | Error): T {
        const m = this._m;
        if (m.type === Just) {
            return m.value;
        } else {
            throw message instanceof Error ? message : new Error(message);
        }
    }

    dispatch<O>(justCallback: (T) => O, nothingCallback: () => O): O {
        const m = this._m;
        return m.type === Just ? justCallback(m.value) : nothingCallback();
    }
}

const _Just = <T>(value: T): Maybe<T> => Maybe.just(value);
const _Nothing = <T>(): Maybe<T> => Maybe.nothing();

// prettier-ignore
export {
    _Just as Just,
    _Nothing as Nothing,
};
