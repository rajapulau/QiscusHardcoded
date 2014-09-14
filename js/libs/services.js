'use strict';

var services = angular.module('qiscus.services', []);

    /*
    call api web service
    */
    services.service('QHttp', ['$http', function($http) {

        /*
        private properties
        */
        var _url, _params, _data;
        var _options = {};

        /*
        make $http option object
        */
        this.buildOptions = function(verb) {

            //set http method verb: GET,POST,etc
            _options.method = verb;

            /*
            setup url string
            */
            if (_url !== 'undefined') {
                _options.url = _url;
            }

            /*
            setup query string, if exists
            */
            if (_params !== 'undefined') {
                _options.params = _params;
            }

            /*
            setup data to send, if exists
            */
            if (_data !== 'undefined') {
                _options.data = _data;
            }

            if (verb == 'POST') {
                _options.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            }

            return _options;
        };

        /*
        set url api to call
        */
        this.setUrl = function(url) {
            _url = url;
        }

        /*
        set query string parameters
        */
        this.setParams = function(params) {
            _params = params;
        }

        /*
        set data to send
        */
        this.setData = function(data) {
            _data = data;
        }

        /*
        connect to api web services
        */
        this.connect = function(verb) {
            var options = this.buildOptions(verb);
            return $http(options);
        }
    }]);
