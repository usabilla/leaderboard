/*@ngInject*/
function SelectController ($state, GameService) {
  var select = this;

  select.games = GameService.getGames()
    .then(function (games) {
      select.games = games;
    });

  select.startGame = function startGame (selectedGame) {
    GameService.selectGame(selectedGame);
    $state.go('start');
  }
}

module.exports = SelectController;
