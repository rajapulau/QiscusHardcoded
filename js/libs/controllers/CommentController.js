'use strict';

qiscus.controller('CommentController', [
    '$scope',
    'QEndPoints',
    'QHardCoded',
    'QServiceComment',

    function($scope, endpoint, hardcoded, comment) {

        var _this = this;
        _this.message = '';
        /*
        send chat message to server
        */
        this.sendChat = function() {
            var url = endpoint.getPostCommentUrl();
            var topic_id = hardcoded.getTopic();
            var token = $scope.token_value;
            var message = _this.message;

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
                    var dataComment = {
                      id: data.comment_id,
                      message: data.message,
                      username_as: hardcoded.getUsername(),
                      created_at: data.sent
                    };
                    $scope.$emit('commentData', dataComment);
                });

                /*
                based error status code
                */
                chat.error(function(data) {
                    alert('this is real error.');
                });

            //clean up message
            _this.message = '';
        };

    }
]);
