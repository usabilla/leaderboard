angular.module('usabilla.leaderboard')
  .controller('ResultController', ['$scope', 'UserService',
    function($scope, UserService) {
      var result = this;

      result.user = UserService.getUser();
    }
  ]);
