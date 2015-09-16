angular.module('usabilla.leaderboard')
  .controller('StartController', ['GameService', function (GameService) {
    GameService.resetCurrentUser();
  }]);
