export default class Maybe<T> {
    just<T>(value: T): Maybe<T>;
    nothing<T>(): Maybe<T>;

    toString(): string;
    isJust(): boolean;
    isNothing(): boolean;
    withDefault(defaultValue: T): T;
    value(): undefined | T;
    unwrap(): T;
    dispatch<O>(justCallback: (value: T) => O, nothingCallback: () => O): O;
}

export function Just<T>(value: T): Maybe<T>;
export function Nothing<T>(): Maybe<T>;
