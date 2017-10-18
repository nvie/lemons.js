// @flow

import * as Result from '../Result';

describe('Result', () => {
    it('result creation', () => {
        const r = Result.ok(42);
        expect(r.value).toEqual(42);
    });
});
