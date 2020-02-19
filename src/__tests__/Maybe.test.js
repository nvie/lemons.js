// @flow strict

import Maybe, { Just, Nothing } from '../Maybe';

describe('Maybe', () => {
    const m1 = Maybe.just(42);
    const m2 = Maybe.just('a string');
    const m3 = Maybe.nothing();

    it('toString', () => {
        expect(m1.toString()).toBe('Just(42)');
        expect(m2.toString()).toBe('Just(a string)');
        expect(m3.toString()).toBe('Nothing');
    });

    it('inspection', () => {
        expect(m1.isJust()).toBe(true);
        expect(m1.isNothing()).toBe(false);
        expect(m2.isJust()).toBe(true);
        expect(m2.isNothing()).toBe(false);
        expect(m3.isJust()).toBe(false);
        expect(m3.isNothing()).toBe(true);
    });

    it('convenience constructors', () => {
        expect(Just(42).isJust()).toBe(true);
        expect(Nothing().isNothing()).toBe(true);
    });

    it('dispatching', () => {
        const [v1, v2, v3] = [m1, m2, m3].map(m =>
            // prettier-ignore
            m.dispatch(
                value => "I'm just " + value.toString(),
                () => "I'm a nothing",
            )
        );
        expect(v1).toBe("I'm just 42");
        expect(v2).toBe("I'm just a string");
        expect(v3).toBe("I'm a nothing");
    });

    it('unwrapping', () => {
        expect(m1.unwrap()).toBe(42);
        expect(m2.unwrap()).toBe('a string');
        expect(() => m3.unwrap()).toThrow('Cannot unwrap a Nothing');
    });

    it('expect', () => {
        class CustomErr extends Error {}
        expect(m1.expect('foo')).toBe(42);
        expect(m2.expect('foo')).toBe('a string');
        expect(() => m3.expect('foo')).toThrow('foo');
        expect(() => m3.expect(new CustomErr('foo'))).toThrow('foo');
        expect(() => m3.expect(new CustomErr('foo'))).toThrow(CustomErr);
    });

    it('withDefault', () => {
        expect(m1.withDefault('foo')).toBe(42);
        expect(m2.withDefault('foo')).toBe('a string');
        expect(m3.withDefault('foo')).toBe('foo');
    });

    it('value', () => {
        expect(m1.value()).toBe(42);
        expect(m2.value()).toBe('a string');
        expect(m3.value()).toBeUndefined();
    });
});
