'use strict';

/*
register service comment: to post comment (chat message) to server
*/
services.service('QServiceComment', ['QHttp', function(qhttp) {

    var url;

    /*
    setup url api endpoint
    */
    this.setUrl = function(api_url) {
        url = api_url
    };

    this.getUrl = function() {
        return url;
    };

    /*
    do post chat message
    */
    this.postComment = function(comment, token, topic_id) {

        var body = 'token='+token+'&comment='+comment+'&topic_id='+topic_id;
        
        qhttp.setUrl(url);
        qhttp.setData(body);

        var connection = qhttp.connect('POST');
        return connection;

    };

    /*
     * get list of comments
     */
    this.getListComments = function(token, topic_id, lastcomment_id) {
        qhttp.setUrl(url+token);

        var connection = qhttp.connect('GET');
        return connection;
    }
}]);
