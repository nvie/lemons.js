export default class Maybe<T> {
    static just<T>(value: T): Maybe<T>;
    static nothing<T>(): Maybe<T>;

    toString(): string;
    isJust(): boolean;
    isNothing(): boolean;
    withDefault(defaultValue: T): T;
    value(): undefined | T;
    unwrap(): T;
    expect(error: string | Error): T;
    dispatch<O>(justCallback: (value: T) => O, nothingCallback: () => O): O;
}

export function Just<T>(value: T): Maybe<T>;
export function Nothing<T>(): Maybe<T>;
