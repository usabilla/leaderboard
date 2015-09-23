/*@ngInject*/
function LeaderBoard ($location, $anchorScroll, GameService) {
  var leaderboard = this;

  var users = GameService.getUsers();
  var currentUser = GameService.getCurrentUser();
  var position = GameService.getUserPosition(currentUser);

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

  leaderboard.isActive = function isActive (index) {
    return index === position;
  }

  function goTo (position) {
    $location.hash(position.toString());
    $anchorScroll();
  }

  if (position > 8) {
    leaderboard.load();
    goTo(position);
  }
}

module.exports = LeaderBoard;
