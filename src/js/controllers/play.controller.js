/*@ngInject*/
function PlayController ($scope, $state, hotkeys, GameService) {
  var play = this;

  play.user = GameService.getCurrentUser();
  play.bestTime = GameService.getBestTime();

  play.begin = function begin () {
    $scope.$apply(function () {
      play.shouldCountdown = false
    });
    $scope.$broadcast('timer-start');
  };

  hotkeys.add({
    combo: 'space',
    description: 'Game Over!',
    callback: function () {
      $scope.$broadcast('timer-stop');
    }
  });

  $scope.$on('timer-stopped', function (event, data) {
    var time = (data.minutes * 60000) + (data.seconds * 1000) + (data.millis % 1000);
    GameService.setUserTime(play.user, time);
    $state.go('result');
  });
}

module.exports = PlayController;
