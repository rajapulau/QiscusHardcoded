'use strict';

describe('Unit: Provider Endpoints', function() {
    var provider = {};

    beforeEach(module('qiscus.providers'));
    beforeEach(inject(function(QEndPoints) {
        provider = QEndPoints;
    }));

    it("should has a same value as testing", function() {
        provider.setBaseUrl('testing');
        expect(provider.getBaseUrl()).toBe('testing');
    });

    it("can reset baseUrl into default value", function() {
        provider.resetBaseUrl();
        expect(provider.getBaseUrl()).toBe('http://qisc.us/api/');
    });

    it("can produce login url using testing string", function() {
        provider.setBaseUrl('testing');
        provider.setLoginUrl('/login');

        var loginUrl = provider.getLoginUrl();
        expect(loginUrl).toBe('testing/login');
    });

    it("can produce logout url using testing string", function() {
        provider.setBaseUrl('testing');
        provider.setLogoutUrl('/logout');

        var logoutUrl = provider.getLogoutUrl();
        expect(logoutUrl).toBe('testing/logout');
    });

    it("can produce post comment url using testing string", function() {
        provider.setBaseUrl('testing');
        provider.setPostCommentUrl('/comment');

        var postCommentUrl = provider.getPostCommentUrl();
        expect(postCommentUrl).toBe('testing/comment');
    });

    it("can produce list comments url using testing string", function() {
        provider.setBaseUrl('testing');
        provider.setListCommentsUrl('/comments');

        var listCommentsUrl = provider.getListCommentsUrl();
        expect(listCommentsUrl).toBe('testing/comments');
    });

    it("can produce list rooms url using testing string", function() {
        provider.setBaseUrl('testing');
        provider.setListRoomsUrl('/rooms');

        var listRoomsUrl = provider.getListRoomsUrl();
        expect(listRoomsUrl).toBe('testing/rooms');
    });

    it("can produce list topics url using testing string", function() {
        provider.setBaseUrl('testing');
        provider.setListTopicsUrl('/topics');

        var listTopicsUrl = provider.getListTopicsUrl();
        expect(listTopicsUrl).toBe('testing/topics');
    });
});
