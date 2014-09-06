'use strict';

describe('Unit: Provider', function() {
    var provider = {};

    beforeEach(module('qiscus.providers'));
    beforeEach(inject(function(QEndPoints) {
        provider = QEndPoints;
        provider.setBaseUrl('testing');
    }));

    it("should has a same value as testing", function() {
        expect(provider.getBaseUrl()).toBe('testing');
    });

    it("can reset baseUrl into default value", function() {
        provider.resetBaseUrl();
        expect(provider.getBaseUrl()).toBe('http://qisc.us/api/');
    });
});
