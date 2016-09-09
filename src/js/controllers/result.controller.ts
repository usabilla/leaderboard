/*@ngInject*/
function ResultController ($scope, $state, $timeout, GameService) {
  var result = this;

  result.player = GameService.getCurrentPlayer();
  result.position = GameService.getPlayerPosition(result.player);

  if (GameService.isFirst(result.player)) {
    GameService.playSound('first');
  }

  var toLeaderboard = $timeout(function leaderboardTimeout () {
    $state.go('leaderboard');
  }, 5000);

  result.replay = function replay () {
    $state.go('count');
    $timeout.cancel(toLeaderboard);
  };

  $scope.$on('$destroy', function onDestroy () {
    $timeout.cancel(toLeaderboard);
    toLeaderboard = undefined;
  });
}

module.exports = ResultController;