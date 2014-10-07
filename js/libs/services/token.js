'use strict';

/**
spesific services for chrome storage API
only for set & get user_token
*/
services.service('QServiceToken', ['ch', function() {

    this.setToken = function(token) {
        ch.storage.sync.set({'user_token': token});
    };

    this.getToken = function() {
        ch.storage.sync.get('user_token');
    };

}]);
