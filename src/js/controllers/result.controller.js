/*@ngInject*/
function ResultController ($scope, $state, $timeout, GameService) {
  var result = this;

  result.user = GameService.getCurrentUser();
  result.position = GameService.getUserPosition(result.user);

  $timeout(function () {
    $state.go('leaderboard');
  }, 5000);
}

module.exports = ResultController;
