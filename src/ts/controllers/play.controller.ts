import {AudioService} from '../services/audio.service';
import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';
import * as angular from 'angular';

export class PlayController {
  private player: Player;
  private bestTime: number;

  static getTime (data: {minutes: number, seconds: number, millis: number}): number {
    return (data.minutes * 60000) + (data.seconds * 1000) + (data.millis % 1000);
  }

  /*@ngInject*/
  constructor (
    private $scope: angular.IScope,
    private $state: angular.ui.IStateService,
    private hotkeys: angular.hotkeys.HotkeysProvider,
    private GameService: GameService,
    private AudioService: AudioService
  ) {

    this.player = GameService.getCurrentPlayer();
    this.bestTime = GameService.getBestTime();

    this.AudioService.playSound('play');

    this.hotkeys.bindTo($scope).add({
      combo: 'space',
      description: 'Game Over!',
      callback: () => {
        this.AudioService.stopSound('play');
        this.AudioService.playSound('buzzer');
        this.$scope.$broadcast('timer-stop');
      }
    });

    $scope.$on('timer-stopped', this.onTimerStopped.bind(this));
  }

  begin (): void {
    this.$scope.$broadcast('timer-start');
  }

  bestTimeExists (): boolean {
    return angular.isDefined(this.bestTime);
  }

  toggleSound (): void {
    this.AudioService.toggleSound('play');
  }

  isMuted (): boolean {
    return this.AudioService.isSoundMuted('play');
  }

  onTimerStopped (event, data): void {
    let time = PlayController.getTime(data);
    this.GameService.setPlayerTime(this.player, time);
    this.$state.go('result');
  }
}
