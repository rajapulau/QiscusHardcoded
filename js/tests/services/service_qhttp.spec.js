'use strict';

describe('Unit: Service QHttp', function() {
    var qhttp;

    //setup module
    beforeEach(module('qiscus.services'));

    //setup service injector
    beforeEach(inject(function(QHttp) {
        qhttp = QHttp;
    }));

    //setup url
    beforeEach(function() {
        this.url = 'https://qisc.us/users/sign_in.json';
    });

    /*
    test build options without url
    */
    it('should return options but without contain an url', function() {

        //set up query string params
        qhttp.setParams({
            test: 'testing',
            test2: 'testing2'
        });

        //set up data to send
        qhttp.setData({
            data: 'testing',
            data2: 'testing'
        });

        var options = qhttp.buildOptions('GET');

        expect(options.url).not.toBeDefined();
        expect(options.params).toBeDefined();
        expect(options.data).toBeDefined();
        expect(options.method).toEqual('GET');
    });

    it('should return full options param with url', function() {

        //setup url to access
        qhttp.setUrl(this.url);

        //set up query string params
        qhttp.setParams({
            test: 'testing',
            test2: 'testing2'
        });

        //set up data to send
        qhttp.setData({
            data: 'testing',
            data2: 'testing'
        });

        var options = qhttp.buildOptions('GET');

        expect(options.params).toBeDefined();
        expect(options.data).toBeDefined();
        expect(options.method).toEqual('GET');
        expect(options.url).toEqual(this.url);
    });

    it('should can to mock success connection', inject(function($httpBackend) {

        /*
        data to send
        */
        var body = {
            'user[email]': 'hrxoneread@yahoo.com',
            'user[password]': 'testing_chrome'
        };

        /*
        mocking $http
        */
        var mock = $httpBackend.expect('POST', this.url, body);
            mock.respond(200, {success: true, token: 123});

        //setup url to access
        qhttp.setUrl(this.url);

        //setup data body
        qhttp.setData(body);

        var connection = qhttp.connect('POST');
            connection.then(function(data) {
                expect(data.data).toBeDefined();
                expect(data.data.success).toBeDefined();
                expect(data.data.token).toBeDefined();
                expect(data.data.success).toEqual(true);
                expect(data.data.token).toEqual(123);
            });

        $httpBackend.flush();
    }));

    it('should can to mock error connection', inject(function($httpBackend) {

        /*
        data to send
        */
        var body = {
            'user[email]': 'testing_email',
            'user[password]': 'testing_password'
        };

        /*
        mocking $http
        */
        var mock = $httpBackend.expect('POST', this.url, body);
            mock.respond(200, {success: false, errors: ['Login failed.']});

        //setup url to access
        qhttp.setUrl(this.url);

        //setup data body
        qhttp.setData(body);

        var connection = qhttp.connect('POST');
            connection.success(function(data) {
                expect(data.success).toBeDefined();
                expect(data.errors).toBeDefined();
                expect(data.token).not.toBeDefined();
                expect(data.success).toBeFalsy();
                expect(data.errors[0]).toEqual('Login failed.');
            });

        $httpBackend.flush();
    }));

});
