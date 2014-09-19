'use strict';

describe('Unit: Service QServiceComment', function() {
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
    describe('Unit: Service QServiceComment: List Comments', function() {
      /*
         setup email & password
         setup getCommentsUrl from endpoints
         */
      beforeEach(function() {
        this.url = endpoints.getListCommentsUrl();
        this.topic_id = hardcoded.getTopic();
        this.token = 123;
        this.lastcomment_id = 100000;
      });

      /*
         setup $httpBackend scenario
         if -> success
         if -> wrong token
         if -> unauthorized topic
         */
      beforeEach(function() {

        /*
           list comment success
           */
        this.ifHttpBackendSuccess = function(url) {
          httpMock.expect('GET', url)
            .respond(200, {
              results: {
                comments: [{
                  id: 123,
                  message: 'a message',
                  username_as: 'uname',
                  username_real: 'email'
                }]
              }
            });
        };
        /*
           list comment error wrong token
           */
        this.ifHttpBackendWrongToken = function(url) {
          httpMock.expect('GET', url)
            .respond(200, {
              error: {
                code: 400,
                message: 'an error message'
              }
            });
        };
        /*
           list comment error wrong token
           */
        this.ifHttpBackendUnauthorizedTopic = function(url) {
          httpMock.expect('GET', url)
            .respond(200, {
              error: {
                code: 403,
                message: 'no access'
              }
            });
        };
      });

      it('is able to list comments', function() {

        //simulate if $http success
        this.ifHttpBackendSuccess(this.url + this.token);

        /*
           get comments
           */
        comment.setUrl(this.url);
        var getComments = comment.getListComments(this.token, this.topic_id, this.lastcomment_id);
        getComments.success(function(data) {
          expect(data.results.comments[0].id).toEqual(123);
          expect(data.results.comments[0].message).toEqual('a message');
          expect(data.results.comments[0].username_as).toEqual('uname');
          expect(data.results.comments[0].username_real).toEqual('email');
        });

        httpMock.flush();
      });
    
      it('does not able to list comments if wrong token', function() {
        //simulate if $http success with wrong token
        this.ifHttpBackendWrongToken(this.url + 'wrongtoken');

        /*
           get comments
           */
        comment.setUrl(this.url);
        var getComments = comment.getListComments('wrongtoken', this.topic_id, this.lastcomment_id);
        getComments.success(function(data) {
          expect(data.error).toBeDefined();
          expect(data.error.code).toEqual(400);
        });

        httpMock.flush();
      });

      it('does not able to list comments if unauthorized topic', function() {
        //simulate if $http success with wrong token
        this.ifHttpBackendUnauthorizedTopic(this.url + this.token);
        var wrong_topic_id = 1234;

        /*
           get comments
           */
        comment.setUrl(this.url);
        var getComments = comment.getListComments(this.token, wrong_topic_id, this.lastcomment_id);
        getComments.success(function(data) {
          expect(data.error).toBeDefined();
          expect(data.error.code).toEqual(403);
        });

        httpMock.flush();
      });
    });

    describe('Unit: Service QServiceComment: Post Comment', function() {
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
});
