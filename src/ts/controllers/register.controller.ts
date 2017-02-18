import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';
import * as angular from 'angular';

interface RegisterControllerScope extends angular.IScope {
  playerForm: angular.IFormController;
}

export class RegisterController {
  private player;
  private players: Player[];

  /*@ngInject*/
  constructor (
    private $scope: RegisterControllerScope,
    private $state: angular.ui.IStateService,
    private GameService: GameService
  ) {

    this.player = {};
    this.players = this.GameService.getPlayers();
  }

  submit (player: Player): void {
    if (this.$scope.playerForm.$invalid) {
      return;
    }
    let registeredPlayer = this.GameService.registerPlayer(player);
    if (angular.isUndefined(registeredPlayer)) {
      return;
    }
    this.$state.go('count');
  }

  isInvalid (field: angular.INgModelController): boolean {
    return (field.$touched && field.$invalid) || this.$scope.playerForm.$submitted;
  }
}
