'use strict';

describe('Unit: Service QServiceLogin', function() {
    var endpoints, hardcoded, login, httpMock;

    /*
    setup modules
    */
    beforeEach(module('qiscus.providers'));
    beforeEach(module('qiscus.services'));

    //setup service injector
    beforeEach(inject(function(QEndPoints, QHardCoded, QServiceLogin, $httpBackend) {
        endpoints = QEndPoints;
        hardcoded = QHardCoded;
        login = QServiceLogin;
        httpMock = $httpBackend;
    }));

    /*
    setup email & password
    setup loginUrl from endpoints
    */
    beforeEach(function() {
        this.user = hardcoded.getUser();
        this.password = hardcoded.getPassword();
        this.loginUrl = endpoints.getLoginUrl();
    });

    /*
    setup $httpBackend scenario
    if -> success
    if -> error
    */
    beforeEach(function() {

        /*
        login succes
        */
        this.ifHttpBackendSuccess = function(url, data) {
            httpMock.expect('POST', url, data)
                .respond(200, {status: true, token: 123});
        };

        /*
        login error
        */
        this.ifHttpBackendError = function(url, data) {
            httpMock.expect('POST', url, data)
                .respond(200, {status: false, errors: ['Login failed.']});
        };
    });

    /*
    test if provider provide email and password data
    */
    it('should provide hardcoded email and password data', function() {
        expect(this.user).toEqual('hrxoneread@yahoo.com');
        expect(this.password).toEqual('testing_chrome');
    });

    /*
    test if provider provide login url endpoint
    */
    it('should provide login endpoint url', function() {
        expect(this.loginUrl).toEqual('https://qisc.us/users/sign_in.json');
    });

    /*
    test service login set url method using dummy string
    */
    it('should can setup url using dummy string', function() {
        login.setUrl('testing');
        expect(login.getUrl()).toEqual('testing');
    });

    /*
    test service login set url method using real endpoint url
    */
    it('should can setup url using real endpoint url', function() {
        login.setUrl(this.loginUrl);
        expect(login.getUrl()).toEqual(this.loginUrl);
    });

    /*
    test if login success
    */
    it('should can login using all provided data', function() {

        var body = {
            'user[email]': 'hrxoneread@yahoo.com',
            'user[password]': 'testing_chrome'
        };

        //simulate if $http success
        this.ifHttpBackendSuccess(this.loginUrl, body);

        login.setUrl(this.loginUrl);
        var loggedIn = login.doLogin(this.user, this.password);

            /*
            check on success callback
            */
            loggedIn.success(function(data) {
                expect(data.status).toBeDefined();
                expect(data.token).toBeDefined();
                expect(data.status).toEqual(true);
                expect(data.token).toEqual(123);
            });

        httpMock.flush();
    });

    it('should cannot login', function() {

        var body = {
            'user[email]': 'hrxoneread@yahoo.com',
            'user[password]': 'testing_chrome'
        };

        //simulate if $http success
        this.ifHttpBackendError(this.loginUrl, body);

        login.setUrl(this.loginUrl);
        var loggedIn = login.doLogin(this.user, this.password);

            /*
            check on success callback
            */
            loggedIn.success(function(data) {
                expect(data.status).toBeDefined();
                expect(data.errors).toBeDefined();
                expect(data.status).toBeFalsy();
                expect(data.errors[0]).toEqual('Login failed.');
            });

        httpMock.flush();

    });

});
