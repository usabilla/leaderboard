import {GameService} from '../services/game.service';

export class CreateController {

  /*@ngInject*/
  constructor (
    private $state: angular.ui.IStateService,
    private GameService: GameService
  ) {

  }

  submit (name: string): void {
    this.GameService.createGame(name);
    this.$state.go('select');
  }
}
