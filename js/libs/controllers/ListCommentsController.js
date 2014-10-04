'use strict';

qiscus.controller('ListCommentsController', [
    '$scope',
    'QEndPoints',
    'QHardCoded',
    'QServiceComment',

    function($scope, endpoint, hardcoded, comment) {
      var url = endpoint.getListCommentsUrl();
      var topic_id = hardcoded.getTopic();
      var lastcomment_id = 100000;

      comment.setUrl(url);

      var listComments = this;
      listComments.comments = [];
      listComments.isMyComment = function(username){
        return hardcoded.getUsername() === username;
      };

      $scope.$on('this_token_value', function(){
        var getComments = comment.getListComments($scope.token_value, topic_id, lastcomment_id);

        getComments.success(function(data) {
          if (data.error) {
            console.log('error bro!');
            console.log(data);
          }
          else {
            console.log('successfully retrieve');
            // console.log(data);
            listComments.comments = data.results.comments;
          }
        });
      });
      $scope.$on('commentData', function(event, data){
        listComments.comments.push(data);
      });
    }
]);
