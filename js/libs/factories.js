'use strict';

var factories = angular.module('qiscus.factories', []);

    /*
    setup factory object for lodash -> lodash wrapper
    */
    factories.factory('_', ['$window', function($window) {
        return $window._;
    }]);    
