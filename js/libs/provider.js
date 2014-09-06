'use strict';

var providers = angular.module('qiscus.providers', []);

/**
setup all Qiscus api endpoints
*/
providers.provider('QEndPoints', function() {
    //base url to send api
    var baseUrl = 'http://qisc.us/api/v1/';

    /*
    all endpoints
    */
    var endpoints = {};
        endpoints.login     = '';
        endpoints.logout    = '';
        endpoints.postComment   = '';
        endpoints.getComments   = '';
        endpoints.getTopics     = '';
        endpoints.getRooms      = '';

    /*
    build an url for api request
    */
    var buildUrl = function(part) {
        return baseUrl + part;
    };

    /*
    getter method
    */
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
            },
            getLoginUrl: function() {
                return buildUrl(endpoints.login);
            },
            getLogoutUrl: function() {
                return buildUrl(endpoints.logout);
            },
            getPostCommentUrl: function() {
                return buildUrl(endpoints.postComment);
            },
            getListCommentsUrl: function() {
                return buildUrl(endpoints.getComments);
            },
            getListTopicsUrl: function() {
                return buildUrl(endpoints.getTopics);
            },
            getListRoomsUrl: function() {
                return buildUrl(endpoints.getRooms);
            },
            setLoginUrl: function(url) {
                endpoints.login = url;
            },
            setLogoutUrl: function(url) {
                endpoints.logout = url;
            },
            setPostCommentUrl: function(url) {
                endpoints.postComment = url;
            },
            setListCommentsUrl: function(url) {
                endpoints.getComments = url;
            },
            setListTopicsUrl: function(url) {
                endpoints.getTopics = url;
            },
            setListRoomsUrl: function(url) {
                endpoints.getRooms = url;
            }
        }
    }
});

/**
setup hardcoded data
*/
providers.provider('QHardCoded', function() {

    /*
    data to hardcoded
    */
    var hardcoded = {};
        hardcoded.user      = '';
        hardcoded.password  = '';
        hardcoded.roomId    = '';
        hardcoded.topicId   = '';

    /*
    getter methods
    */
    this.$get = function() {
        return {
            getUser: function() {
                return hardcoded.user;
            },
            getPassword: function() {
                return hardcoded.password;
            },
            getRoom: function() {
                return hardcoded.roomId;
            },
            getTopic: function() {
                return hardcoded.topicId;
            }
        }
    }
});
