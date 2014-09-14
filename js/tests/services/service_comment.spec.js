'use strict';

describe('Unit: Service QServiceLogin', function() {
    var endpoints, hardcoded, comment, httpMock;

    /*
    setup modules
    */
    beforeEach(module('qiscus.providers'));
    beforeEach(module('qiscus.services'));

    //setup service injector
    beforeEach(inject(function(QEndPoints, QHardCoded, QServiceComment, $httpBackend) {
        endpoints = QEndPoints;
        hardcoded = QHardCoded;
        comment = QServiceComment;
        httpMock = $httpBackend;
    }));

    /*
    setup email & password
    setup loginUrl from endpoints
    */
    beforeEach(function() {
        this.url = endpoints.getPostCommentUrl();
        this.topic_id = hardcoded.getTopic();
        this.token = 123;
        this.message = 'testing';
    });

    /*
    setup $httpBackend scenario
    if -> success
    if -> error
    */
    beforeEach(function() {

        /*
        chat succes
        */
        this.ifHttpBackendSuccess = function(url, data) {
            httpMock.expect('POST', url, data)
                .respond(200, {status: 1, sent: '00:00', comment_id: 1});
        };

        /*
        chat fail authorize
        */
        this.ifHttpBackendErrorAuthorize = function(url, data) {
            httpMock.expect('POST', url, data)
                .respond(200, {error: 401});
        };

        /*
        chat goto 404
        */
        this.ifHttpBackendError404 = function(url, data) {
            httpMock.expect('POST', url, data)
                .respond(404, 'testing');
        };
    });

    it('should can post comment', function() {

        var body = 'token='+this.token+'&comment=testing&topic_id='+this.topic_id;

        //simulate if $http success
        this.ifHttpBackendSuccess(this.url, body);

        /*
        send chat
        */
        comment.setUrl(this.url);
        var chat = comment.postComment('testing', this.token, this.topic_id);
            chat.success(function(data) {
                expect(data.status).toEqual(1);
                expect(data.sent).toEqual('00:00');
                expect(data.comment_id).toEqual(1);
            });

        httpMock.flush();
    });

    it('should cannot post comment because authorize error', function() {

        var body = 'token='+this.token+'&comment=testing&topic_id='+this.topic_id;

        //simulate if $http success
        this.ifHttpBackendErrorAuthorize(this.url, body);

        /*
        send chat
        */
        comment.setUrl(this.url);
        var chat = comment.postComment('testing', this.token, this.topic_id);
            chat.success(function(data) {
                expect(data.error).toBeDefined();
                expect(data.error).toEqual(401);
            });

        httpMock.flush();
    });

    it('should cannot post comment because error 404', function() {

        var body = 'token='+this.token+'&comment=testing&topic_id='+this.topic_id;

        //simulate if $http success
        this.ifHttpBackendError404(this.url, body);

        /*
        send chat
        */
        comment.setUrl(this.url);
        var chat = comment.postComment('testing', this.token, this.topic_id);
            chat.error(function(data) {
                expect(data).toEqual('testing');
            });

        httpMock.flush();
    });

});
