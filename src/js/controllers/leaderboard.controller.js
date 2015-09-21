/*@ngInject*/
function LeaderBoard (GameService) {
  var leaderboard = this;

  var users = GameService.getUsers();

  leaderboard.show = true;
  leaderboard.users = users.slice(0, 8);

  leaderboard.areUsers = function areUsers () {
    return leaderboard.users.length > 0;
  };

  leaderboard.load = function load () {
    var restUsers = users.slice(8);
    leaderboard.users = leaderboard.users.concat(restUsers);
    leaderboard.show = false;
  }

  leaderboard.less = function less () {
    leaderboard.users = users.slice(0, 8);
    leaderboard.show = true;
  }
}

module.exports = LeaderBoard;
