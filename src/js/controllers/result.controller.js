/*@ngInject*/
function ResultController ($scope, $state, $timeout, GameService) {
  var result = this;

  result.user = GameService.getCurrentUser();
  result.position = GameService.getUserPosition(result.user);

  result.replay = function replay () {
    $state.go('count');
    $timeout.cancel(toLeaderboard);
  }

  var toLeaderboard = $timeout(function () {
    $state.go('leaderboard');
  }, 5000);

  $scope.$on('$destroy', function () {
    $timeout.cancel(toLeaderboard);
  })
}

module.exports = ResultController;
