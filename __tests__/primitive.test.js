const sum = require('../__utils__/sum');

describe('tests if JEST integration works nicely', () => {
    test('adds 1 + 2 to equal 3', () => {
        const value = sum(1, 2);
        expect(value).toEqual(3);
    });
});