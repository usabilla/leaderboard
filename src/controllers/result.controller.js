angular.module('usabilla.leaderboard')
  .controller('ResultController', ['$scope', 'GameService',
    function($scope, GameService) {
      var result = this;

      result.user = GameService.getCurrentUser();
      result.position = GameService.getUserPosition(result.user);
    }
  ]);
