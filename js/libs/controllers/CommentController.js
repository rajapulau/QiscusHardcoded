'use strict';

qiscus.controller('CommentController', [
    '$scope',
    'QEndPoints',
    'QHardCoded',
    'QServiceComment',

    function($scope, endpoint, hardcoded, comment) {        

        /*
        send chat message to server
        */
        this.sendChat = function() {
            var url = endpoint.getPostCommentUrl();
            var topic_id = hardcoded.getTopic();
            var token = $scope.token_value;
            var message = $scope.message;

            /*
            send chat message to server
            */
            comment.setUrl(url);
            var chat = comment.postComment(message, token, topic_id);

                /*
                on error authorization
                */
                chat.success(function(data) {
                    if (data.error) {
                        alert('error authorization.');
                    }
                });

                /*
                based error status code
                */
                chat.error(function(data) {
                    alert('this is real error.');
                });

            //clean up message
            $scope.message = '';
        };

    }
]);
