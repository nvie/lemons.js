// @flow

import Result from '../Result';

describe('Result', () => {
    const r1 = Result.ok(42);
    const r2 = Result.ok("I'm a string");
    const r3 = Result.err(new Error('Proper JS error'));
    const r4 = Result.err('Error as a simple string value');

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

    it('dispatching', () => {
        const [v1, v2, v3, v4] = [r1, r2, r3, r4].map(r =>
            // prettier-ignore
            r.dispatch(
                () => "I'm an error",
                () => "I'm a success",
            )
        );
        expect(v1).toBe("I'm a success");
        expect(v2).toBe("I'm a success");
        expect(v3).toBe("I'm an error");
        expect(v4).toBe("I'm an error");
    });

    it('unwrapping', () => {
        expect(r1.unwrap()).toBe(42);
        expect(r2.unwrap()).toBe("I'm a string");
        expect(() => r3.unwrap()).toThrow('Proper JS error');
        expect(() => r4.unwrap()).toThrow('Error as a simple string value');
    });

    it('withDefault', () => {
        expect(r1.withDefault('foo')).toBe(42);
        expect(r2.withDefault('foo')).toBe("I'm a string");
        expect(r3.withDefault('foo')).toBe('foo');
        expect(r4.withDefault('foo')).toBe('foo');
    });
});
