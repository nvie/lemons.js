// @flow

// prettier-ignore
opaque type _ResultT<E, D> =
    | { _ResultT: 'Err', error: E }
    | { _ResultT: 'Ok', value: D };

export default class Result<E, D> {
    _r: _ResultT<E, D>;

    constructor(r: _ResultT<E, D>) {
        this._r = r;
    }

    static ok(value: D): Result<E, D> {
        return new Result({ _ResultT: 'Ok', value });
    }

    static err(error: E): Result<E, D> {
        return new Result({ _ResultT: 'Err', error });
    }

    isOk(): boolean {
        return this._r._ResultT === 'Ok';
    }

    isErr(): boolean {
        return this._r._ResultT === 'Err';
    }
}
