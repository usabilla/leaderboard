/*@ngInject*/
function CountController ($scope, $state, GameService) {
  var count = this;

  count.user = GameService.getCurrentUser();

  count.begin = function begin () {
    $scope.$apply(function () {
      count.shouldCountdown = false
    });
    $state.go('play');
  };

  $scope.$on('timer-tick', function (event, args) {
    var millis = args.millis;
    if (millis < 1000) {
      return;
    }
    var countSound = millis / 1000;
    GameService.playSound(countSound);
  })
}

module.exports = CountController;
