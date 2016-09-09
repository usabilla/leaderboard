import {AudioService} from '../services/audio.service';

/*@ngInject*/
function CountController ($scope, $state, GameService, AudioService: AudioService) {
  var count = this;

  count.player = GameService.getCurrentPlayer();

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
    AudioService.playSound(countSound.toString());
  })
}

module.exports = CountController;
