angular.module('usabilla.leaderboard')
  .controller('LeaderboardController', ['GameService', function (GameService) {
    var leaderboard = this;

    leaderboard.users = GameService.getUsers();

    leaderboard.areUsers = function areUsers () {
      return leaderboard.users.length > 0;
    }
  }]);
