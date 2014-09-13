'use strict';

describe('Unit: Provider HardCoded', function() {
    var provider = {};

    beforeEach(module('qiscus.providers'));
    beforeEach(inject(function(QHardCoded) {
        provider = QHardCoded;
    }));

    it("can produce hardcoded user credential", function() {
        expect(provider.getUser()).toBe('hrxoneread@yahoo.com');
    });

    it("can produce hardcoded password credential", function() {
        expect(provider.getPassword()).toBe('testing_chrome');
    });

    it("can produce hardcoded room id", function() {
        expect(provider.getRoom()).toBe('2246');
    });

    it("can produce hardcoded topic id", function() {
        expect(provider.getTopic()).toBe('4427');
    });
});
