'use strict';

var factories = angular.module('qiscus.factories', []);
    factories.factory('_', ['$window', function($window) {
        return $window._;
    }]);
