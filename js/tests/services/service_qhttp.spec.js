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

});
