// @flow

// prettier-ignore
export type ResultT<E, D> =
    | { ResultT: 'Err', error: E }
    | { ResultT: 'Ok', value: D };
