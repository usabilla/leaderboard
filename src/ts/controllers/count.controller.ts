import {AudioService} from '../services/audio.service';
import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';

export class CountController {
  private player: Player;

  /*@ngInject*/
  constructor (
    private $scope: angular.IScope,
    private $state: angular.ui.IStateService,
    private GameService: GameService,
    private AudioService: AudioService
  ) {

    this.player = this.GameService.getCurrentPlayer();

    this.$scope.$on('timer-tick', this.onTimerTick.bind(this));
  }

  begin () {
    this.$state.go('play');
  }

  onTimerTick (event, args: {millis: number}): void {
    const millis = args.millis;
    if (millis < 1000) {
      return;
    }
    const countSound = millis / 1000;
    this.AudioService.playSound(countSound.toString());
  }
}
