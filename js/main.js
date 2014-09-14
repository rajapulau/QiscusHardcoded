'use strict';

var qiscus = angular.module('qiscus', [
    'qiscus.providers',
    'qiscus.factories',
    'qiscus.services',
]);

/*
application main method
*/
qiscus.run(['$rootScope', '$injector', function($rootScope, $injector) {

    var endpoints = $injector.get('QEndPoints');
    var hardcoded = $injector.get('QHardCoded');
    var login = $injector.get('QServiceLogin');

    var email   = hardcoded.getUser();
    var pass    = hardcoded.getPassword();

    /*
    run login
    */
    login.setUrl(endpoints.getLoginUrl());
    var loggedIn = login.doLogin(email, pass);

        /*
        on request success
        */
        loggedIn.success(function(data) {

            /*
            only if login success
            */
            if (data.success == true) {
                $rootScope.token_value = data.token;
            }
        });

    /*
    watch token_url properties changes
    */
    $rootScope.$watch('token_url', function() {
        if ($rootScope !== 'undefined') {
            $rootScope.$broadcast('setup_token_value', $rootScope.token_value);
        }
    });

}]);
