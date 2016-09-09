import {AudioService} from '../services/audio.service';

/*@ngInject*/
function PlayController ($scope, $state, hotkeys, GameService, AudioService: AudioService) {
  var play = this;

  play.player = GameService.getCurrentPlayer();
  play.bestTime = GameService.getBestTime();

  AudioService.playSound('play');

  play.begin = function begin () {
    $scope.$apply(function () {
      play.shouldCountdown = false
    });
    $scope.$broadcast('timer-start');
  };

  play.bestTimeExists = function bestTimeExists () {
    return angular.isDefined(play.bestTime);
  };

  play.toggleSound = function toggleSound () {
    AudioService.toggleSound('play');
  };

  play.isMuted = function isMuted () {
    return AudioService.isSoundMuted('play');
  };

  hotkeys.bindTo($scope).add({
    combo: 'space',
    description: 'Game Over!',
    callback: function () {
      AudioService.stopSound('play');
      AudioService.playSound('buzzer');
      $scope.$broadcast('timer-stop');
    }
  });

  $scope.$on('timer-stopped', function (event, data) {
    var time = getTime(data);
    GameService.setPlayerTime(play.player, time);
    $state.go('result');
  });

  function getTime (data) {
    return (data.minutes * 60000) + (data.seconds * 1000) + (data.millis % 1000);
  }
}

module.exports = PlayController;
