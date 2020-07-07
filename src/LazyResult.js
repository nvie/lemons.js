// @flow strict

/**
 * LazyResult error result
 *     = Initial
 *     | Loading
 *     | Failure error
 *     | Success result
 */

const Initial = 'Initial';
const Loading = 'Loading';
const Failure = 'Failure';
const Success = 'Success';

// prettier-ignore
opaque type $LazyResultT<E, T> =
    | { type: typeof Initial }
    | { type: typeof Loading }
    | { type: typeof Failure, error: E }
    | { type: typeof Success, result: T };

const nothing = () => undefined;

/**
 * Represents a union type that's in either one of these four stages: Initial,
 * Loading, Failure, or Success.
 *
 *     LazyResult error result
 *         = Initial
 *         | Loading
 *         | Failure error
 *         | Success result
 *
 */
export default class LazyResult<E, T> {
    _r: $LazyResultT<E, T>;

    /**
     * **Do not call this constructor directly!**  Use either `Maybe.just()` or
     * `Maybe.nothing()` to construct a new Maybe instance.
     */
    constructor(r: $LazyResultT<E, T>) {
        this._r = r;
    }

    /**
     * Create a new LazyResult instance representing a computation that has not
     * yet begun.
     */
    static initial(): LazyResult<E, T> {
        return new LazyResult({ type: Initial });
    }

    /**
     * Create a new LazyResult instance representing a computation that has
     * started, but not yet finished.
     */
    static loading(): LazyResult<E, T> {
        return new LazyResult({ type: Loading });
    }

    /**
     * Create a new LazyResult instance representing a failure.
     */
    static failure(error: E): LazyResult<E, T> {
        return new LazyResult({ type: Failure, error });
    }

    /**
     * Create a new LazyResult instance representing a successfully computed
     * value.
     */
    static success(result: T): LazyResult<E, T> {
        return new LazyResult({ type: Success, result });
    }

    toString(): string {
        const r = this._r;
        if (r.type === Initial) {
            return 'Initial';
        } else if (r.type === Loading) {
            return 'Loading';
        } else if (r.type === Failure) {
            return `Failure(${String(r.error)})`;
        } else {
            return `Success(${String(r.result)})`;
        }
    }

    isInitial(): boolean {
        return this._r.type === Initial;
    }

    isLoading(): boolean {
        return this._r.type === Loading;
    }

    isFailure(): boolean {
        return this._r.type === Failure;
    }

    isSuccess(): boolean {
        return this._r.type === Success;
    }

    dispatch<O>(
        initialCallback: () => O,
        loadingCallback: () => O,
        failureCallback: (E) => O,
        successCallback: (T) => O
    ): O {
        const r = this._r;
        if (r.type === Initial) {
            return initialCallback();
        } else if (r.type === Loading) {
            return loadingCallback();
        } else if (r.type === Failure) {
            return failureCallback(r.error);
        } else {
            return successCallback(r.result);
        }
    }

    mapSuccess<V>(mapFn: (T) => V): LazyResult<E, V> {
        return this.dispatch(
            () => LazyResult.initial(),
            () => LazyResult.loading(),
            (error: E) => LazyResult.failure(error),
            (value: T) => LazyResult.success(mapFn(value))
        );
    }

    mapFailure<F>(mapFn: (E) => F): LazyResult<F, T> {
        return this.dispatch(
            () => LazyResult.initial(),
            () => LazyResult.loading(),
            (error: E) => LazyResult.failure(mapFn(error)),
            (value: T) => LazyResult.success(value)
        );
    }

    value(): T | void {
        return this.dispatch(nothing, nothing, nothing, (x) => x);
    }

    error(): E | void {
        return this.dispatch(nothing, nothing, (x) => x, nothing);
    }
}

const _Initial = <E, T>(): LazyResult<E, T> => LazyResult.initial();
const _Loading = <E, T>(): LazyResult<E, T> => LazyResult.loading();
const _Failure = <E, T>(error: E): LazyResult<E, T> => LazyResult.failure(error);
const _Success = <E, T>(result: T): LazyResult<E, T> => LazyResult.success(result);

// prettier-ignore
export {
    _Initial as Initial,
    _Loading as Loading,
    _Failure as Failure,
    _Success as Success,
};
