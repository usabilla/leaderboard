/*@ngInject*/
function CountController ($scope, $state, GameService, ngAudio) {
  var count = this;

  count.user = GameService.getCurrentUser();

  count.begin = function begin () {
    $scope.$apply(function () {
      count.shouldCountdown = false
    });
    $state.go('play');
  };

  $scope.$on('timer-tick', function (event, args) {
    if (args.millis < 1000) {
      return;
    }
    GameService.playSound('count');
  })
}

module.exports = CountController;
