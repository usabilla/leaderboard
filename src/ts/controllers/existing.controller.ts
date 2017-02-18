import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';
import * as angular from 'angular';

export class ExistingController {
  private selectedPlayer: Player;
  private players: Player[];

  /*@ngInject*/
  constructor (
    private $state: angular.ui.IStateService,
    private $scope: angular.IScope,
    private GameService: GameService
  ) {

    this.reset();
  }

  reset (): void {
    this.selectedPlayer = undefined;
    this.players = this.GameService.getPlayers();
  }

  select (player: Player): void {
    if (angular.isUndefined(player)) {
      return;
    }
    this.GameService.setCurrentPlayer(player);
    this.$state.go('count');
  }

  remove (player: Player): void {
    if (angular.isUndefined(player)) {
      return;
    }

    this.GameService.removePlayer(player);

    this.$scope.$broadcast('angucomplete-alt:clearInput', 'selectedPlayer');

    this.reset();
  }
}
