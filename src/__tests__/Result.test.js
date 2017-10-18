// @flow

import Result from '../Result';

describe('Result', () => {
    it('result creation', () => {
        const r1 = Result.ok(42);
        expect(r1.isOk()).toBe(true);
        expect(r1.isErr()).toBe(false);

        const r2 = Result.ok('ohai');
        expect(r2.isOk()).toBe(true);
        expect(r2.isErr()).toBe(false);

        const r3 = Result.err('oops');
        expect(r3.isOk()).toBe(false);
        expect(r3.isErr()).toBe(true);
    });
});
