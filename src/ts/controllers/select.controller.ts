import {Game} from '../models/game.model';
import {GameService} from '../services/game.service';

/*@ngInject*/
export class SelectController {
  private games: Game[];

  constructor (
    private $state: angular.ui.IStateService,
    private $scope: angular.IScope,
    private GameService: GameService
  ) {
    this.GameService.getGames()
      .then((games) => {
        this.$scope.$apply(() => {
          this.games = games;
        });
      });
  }

  startGame (selectedGame) {
    this.GameService.selectGame(selectedGame);
    this.$state.go('start');
  }
}
