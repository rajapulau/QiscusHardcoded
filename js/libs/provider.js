'use strict';

var providers = angular.module('qiscus.providers', []);

providers.provider('QEndPoints', function() {
    var baseUrl = 'http://qisc.us/api/';

    this.$get = function() {
        return {
            getBaseUrl: function() {
                return baseUrl;
            },
            setBaseUrl: function(url) {
                baseUrl = url;
            },
            resetBaseUrl: function() {
                baseUrl = 'http://qisc.us/api/';
            }
        }
    }
});
