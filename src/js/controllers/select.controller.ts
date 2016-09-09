import {Game} from '../models/game.model';

/*@ngInject*/
export class SelectController  {
  games: Game[];

  constructor (private $state, private $scope: angular.IScope, private GameService) {
    GameService.getGames()
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
