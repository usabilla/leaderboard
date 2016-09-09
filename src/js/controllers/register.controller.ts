import {GameService} from '../services/game.service';
import {Player} from '../models/player.model';

interface IRegisterControllerScope extends angular.IScope {
  playerForm;
}

export class RegisterController {
  private player;
  private players: Player[];

  /*@ngInject*/
  constructor (
    private $scope: IRegisterControllerScope,
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
    var registeredPlayer = this.GameService.registerPlayer(player);
    if (angular.isUndefined(registeredPlayer)) {
      return;
    }
    this.$state.go('count');
  }

  isInvalid (field: angular.INgModelController): boolean {
    return (field.$touched && field.$invalid) || this.$scope.playerForm.$submitted;
  }
}
