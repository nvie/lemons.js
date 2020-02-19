export default class Result<E, T> {
    static ok<E, T>(value: T): Result<E, T>;
    static err<E, T>(error: E): Result<E, T>;

    toString(): string;
    isOk(): boolean;
    isErr(): boolean;
    withDefault(defaultValue: T): T;
    value(): undefined | T;
    errValue(): undefined | E;
    unwrap(): T;
    expect(error: string | Error): T;
    dispatch<O>(okCallback: (value: T) => O, errCallback: (error: E) => O): O;
    andThen<V>(callback: (value: T) => Result<E, V>): Result<E, V>;
    map<T2>(mapper: (value: T) => T2): Result<E, T2>;
    mapError<E2>(mapper: (error: E) => E2): Result<E2, T>;
}

export function Ok<E, T>(value: T): Result<E, T>;
export function Err<E, T>(error: E): Result<E, T>;
