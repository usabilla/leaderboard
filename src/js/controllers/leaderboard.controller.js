/*@ngInject*/
function LeaderBoard ($location, $anchorScroll, GameService) {
  var leaderboard = this;

  var players = GameService.getPlayers();
  var currentPlayer = GameService.getCurrentPlayer();
  var position = GameService.getPlayerPosition(currentPlayer);

  leaderboard.show = true;
  leaderboard.players = players.slice(0, 8);

  leaderboard.arePlayers = function arePlayers () {
    return leaderboard.players.length > 0;
  };

  leaderboard.load = function load () {
    var restPlayers = players.slice(8);
    leaderboard.players = leaderboard.players.concat(restPlayers);
    leaderboard.show = false;
  };

  leaderboard.less = function less () {
    leaderboard.players = players.slice(0, 8);
    leaderboard.show = true;
  };

  leaderboard.isActive = function isActive (index) {
    return index === position;
  };

  leaderboard.shouldShowMore = function shouldShowMore () {
    return players.length > 8;
  };

  leaderboard.isFirst = function isFirst (index) {
    return index === 0;
  };

  function goTo (position) {
    if (angular.isUndefined(position)) {
      return;
    }
    var to = position > 4 ? position - 4 : position;
    $location.hash(to.toString());
    $anchorScroll();
  }

  if (position > 8) {
    leaderboard.load();
  }

  goTo(position);
}

module.exports = LeaderBoard;
