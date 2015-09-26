/*@ngInject*/
function PlayController ($scope, $state, hotkeys, GameService) {
  var play = this;

  play.user = GameService.getCurrentUser();
  play.bestTime = GameService.getBestTime();

  GameService.playSound('play');

  play.begin = function begin () {
    $scope.$apply(function () {
      play.shouldCountdown = false
    });
    $scope.$broadcast('timer-start');
  };

  play.bestTimeExists = function bestTimeExists () {
    return angular.isDefined(play.bestTime);
  }

  play.mute = function mute () {
    GameService.muteSound();
  }

  hotkeys.add({
    combo: 'space',
    description: 'Game Over!',
    callback: function () {
      GameService.playSound('buzzer');
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
