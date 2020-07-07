export default class LazyResult<E, T> {
    static initial<E, T>(): LazyResult<E, T>;
    static loading<E, T>(): LazyResult<E, T>;
    static failure<E, T>(error: E): LazyResult<E, T>;
    static success<E, T>(value: T): LazyResult<E, T>;

    toString(): string;
    isInitial(): boolean;
    isLoading(): boolean;
    isFailure(): boolean;
    isSuccess(): boolean;
    dispatch<O>(
        initialCallback: () => O,
        loadingCallback: () => O,
        failureCallback: (error: E) => O,
        successCallback: (value: T) => O
    ): O;
    mapSuccess<V>(mapFn: (value: T) => V): LazyResult<E, V>;
    mapFailure<F>(mapFn: (error: E) => F): LazyResult<F, T>;
    value(): undefined | T;
    error(): undefined | E;
}

export function Initial<E, T>(): LazyResult<E, T>;
export function Loading<E, T>(): LazyResult<E, T>;
export function Failure<E, T>(error: E): LazyResult<E, T>;
export function Success<E, T>(result: T): LazyResult<E, T>;
