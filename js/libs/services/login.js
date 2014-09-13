'use strict';

/*
spesific services for login
*/
services.service('QServiceLogin',['QHttp', function(qhttp) {

    var url;

    /*
    set login url
    */
    this.setUrl = function(login_url) {
        url = login_url;
    };

    /*
    get login url
    */
    this.getUrl = function() {
        return url;
    };

    /*
    do login request
    */
    this.doLogin = function(email, password, callback) {

        var data = {
            'user[email]': email,
            'user[password]': password
        };

        /*
        setup http properties:
        > urlendpoint
        > data to send
        */
        qhttp.setUrl(url);
        qhttp.setData(data);

        var connection = qhttp.connect('POST');
        return connection;
    };

}]);
