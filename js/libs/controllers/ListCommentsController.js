'use strict';

qiscus.controller('ListCommentsController', [
    '$scope',
    'QEndPoints',
    'QHardCoded',
    'QServiceComment',

    function($scope, endpoint, hardcoded, comment) {
      var listComments = this;
      $scope.$on('this_token_value', function(){
        var url = endpoint.getListCommentsUrl();
        var topic_id = hardcoded.getTopic();
        var token = $scope.token_value;
        var lastcomment_id = 100000;

        listComments.comments = [];

        comment.setUrl(url);
        var getComments = comment.getListComments(token, topic_id, lastcomment_id);

        getComments.success(function(data) {
          if (data.error) {
            console.log('error bro!');
            // console.log(data);
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
