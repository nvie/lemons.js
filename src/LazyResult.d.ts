export default class LazyResult<E, T> {
  initial(): LazyResult<E, T>;
  loading(): LazyResult<E, T>;
  failure(error: E): LazyResult<E, T>;
  success(value: T): LazyResult<E, T>;

  toString(): string;
  isInitial(): boolean;
  isLoading(): boolean;
  isFailure(): boolean;
  isSuccess(): boolean;
  dispatch<O>(
    initialCallback: () => O,
    loadingCallback: () => O,
    failureCallback: (error: E) => O,
    successCallback: (value: T) => O,
  ): O;
  value(): undefined | T;
  error(): undefined | E;
}

export function Initial<E, T>(): LazyResult<E, T>;
export function Loading<E, T>(): LazyResult<E, T>;
export function Failure<E, T>(error: E): LazyResult<E, T>;
export function Success<E, T>(result: T): LazyResult<E, T>;
