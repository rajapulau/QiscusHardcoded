'use strict';

describe('Unit: Factory Lodash', function() {
    var lodash;

    beforeEach(module('qiscus.factories'));
    beforeEach(inject(function(_) {
        lodash = _;
    }));

    it('should has first method from lodash', function() {
        var arr = [1,2,3];
        expect(lodash.first(arr)).toBe(1);
    });

    it('should has last method from lodash', function() {
        var arr = [1,2,3];
        expect(lodash.last(arr)).toBe(3);
    });

    it('should has pull method from lodash', function() {
        var arr = [1,2,3];
        lodash.pull(arr, 2, 3);

        var arr_after_pull = [1];

        expect(arr).toEqual(arr_after_pull);
    });
});
