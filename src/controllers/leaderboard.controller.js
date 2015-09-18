/*@ngInject*/
function LeaderBoard (GameService) {
  var leaderboard = this;

  leaderboard.users = GameService.getUsers();

  leaderboard.areUsers = function areUsers () {
    return leaderboard.users.length > 0;
  }
}

module.exports = LeaderBoard;
