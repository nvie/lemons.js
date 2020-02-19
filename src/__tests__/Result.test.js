// @flow strict

import Result, { Err, Ok } from '../Result';

describe('Result', () => {
    const r1 = Result.ok(42);
    const r2 = Result.ok("I'm a string");
    const r3 = Result.err(new Error('Proper JS error'));
    const r4 = Result.err('a reason');

    it('toString', () => {
        expect(r1.toString()).toBe('Ok(42)');
        expect(r2.toString()).toBe("Ok(I'm a string)");
        expect(r3.toString()).toBe('Err(Error: Proper JS error)');
        expect(r4.toString()).toBe('Err(a reason)');
    });

    it('inspection', () => {
        expect(r1.isOk()).toBe(true);
        expect(r1.isErr()).toBe(false);
        expect(r2.isOk()).toBe(true);
        expect(r2.isErr()).toBe(false);
        expect(r3.isOk()).toBe(false);
        expect(r3.isErr()).toBe(true);
        expect(r4.isOk()).toBe(false);
        expect(r4.isErr()).toBe(true);
    });

    it('convenience constructors', () => {
        expect(Ok(42).isOk()).toBe(true);
        expect(Err('oops').isErr()).toBe(true);
    });

    it('dispatching', () => {
        const [v1, v2, v3, v4] = [r1, r2, r3, r4].map(r =>
            // prettier-ignore
            r.dispatch(
                () => "I'm a success",
                () => "I'm an error",
            )
        );
        expect(v1).toBe("I'm a success");
        expect(v2).toBe("I'm a success");
        expect(v3).toBe("I'm an error");
        expect(v4).toBe("I'm an error");
    });

    it('map', () => {
        expect(r1.map(x => x.toString()).value()).toBe('42');
        expect(r4.map(x => x.length).value()).toBeUndefined();
    });

    it('mapError', () => {
        expect(r1.mapError(_ => 'whoopsy').unwrap()).toBe(42);
        expect(r2.mapError(_ => 'whoopsy').unwrap()).toBe("I'm a string");
        expect(() => r3.mapError(_ => 'whoopsy').unwrap()).toThrow('whoopsy');
        expect(() => r4.mapError(_ => 'whoopsy').unwrap()).toThrow('whoopsy');
    });

    it('unwrapping', () => {
        expect(r1.unwrap()).toBe(42);
        expect(r2.unwrap()).toBe("I'm a string");
        expect(() => r3.unwrap()).toThrow('Proper JS error');
        expect(() => r4.unwrap()).toThrow('a reason');
    });

    it('expect', () => {
        class CustomErr extends Error { }
        expect(r1.expect('foo')).toBe(42);
        expect(r2.expect('foo')).toBe("I'm a string");
        expect(() => r3.expect('foo')).toThrow('foo');
        expect(() => r3.expect(new CustomErr('foo'))).toThrow('foo');
        expect(() => r3.expect(new CustomErr('foo'))).toThrow(CustomErr);
    });

    it('withDefault', () => {
        expect(r1.withDefault('foo')).toBe(42);
        expect(r2.withDefault('foo')).toBe("I'm a string");
        expect(r3.withDefault('foo')).toBe('foo');
        expect(r4.withDefault('foo')).toBe('foo');
    });

    it('value', () => {
        expect(r1.value()).toBe(42);
        expect(r2.value()).toBe("I'm a string");
        expect(r3.value()).toBeUndefined();
        expect(r4.value()).toBeUndefined();
    });

    it('errValue', () => {
        expect(r1.errValue()).toBeUndefined();
        expect(r2.errValue()).toBeUndefined();
        expect(r3.errValue()).toEqual(new Error('Proper JS error'));
        expect(r4.errValue()).toEqual('a reason');
    });

    it('andThen', () => {
        const [v1, v2, v3, v4] = [r1, r2, r3, r4].map(r =>
            // prettier-ignore
            r.andThen(
                n => typeof n === 'number' ? Result.ok(n * 2) : Result.err('not a number')
            )
        );
        expect(v1.value()).toBe(84);
        expect(v2.isErr()).toBe(true);
        expect(v3.isErr()).toBe(true);
        expect(v4.isErr()).toBe(true);
    });
});
