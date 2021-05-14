const sum = require('./js/sum');

test('adds a + 2 to equal 3' , () => {
    expect(sum(1, 2)).toBe(3);
});