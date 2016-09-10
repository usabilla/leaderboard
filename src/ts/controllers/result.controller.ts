import {AudioService} from '../services/audio.service';
import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';

export class ResultController {
  private player: Player;
  private position: number;
  private toLeaderboard: angular.IPromise<any>;

  /*@ngInject*/
  constructor (
    private $scope: angular.IScope,
    private $state: angular.ui.IStateService,
    private $timeout: angular.ITimeoutService,
    private GameService: GameService,
    private AudioService: AudioService
  ) {

    this.player = GameService.getCurrentPlayer();
    this.position = GameService.getPlayerPosition(this.player);

    if (this.GameService.isFirst(this.player)) {
      this.AudioService.playSound('first');
    }

    this.toLeaderboard = this.$timeout(() => {
      this.$state.go('leaderboard');
    }, 5000);

    this.$scope.$on('$destroy', this.onScopeDestroy.bind(this));
  }

  replay (): void {
    this.$state.go('count');
    this.$timeout.cancel(this.toLeaderboard);
    this.toLeaderboard = undefined;
  }

  onScopeDestroy (): void {
    this.$timeout.cancel(this.toLeaderboard);
    this.toLeaderboard = undefined;
  }
}
