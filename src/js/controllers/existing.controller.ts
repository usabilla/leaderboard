/*@ngInject*/
function ExistingController ($state, $scope, GameService) {
  var existing = this;

  function reset () {
    existing.selectedPlayer = undefined;
    existing.players = GameService.getPlayers();
  }

  existing.select = function select (player) {
    if (angular.isUndefined(player)) {
      return;
    }
    GameService.setCurrentPlayer(player);
    $state.go('count');
  };

  existing.remove = function remove (player) {
    if (angular.isUndefined(player)) {
      return;
    }

    GameService.removePlayer(player);

    $scope.$broadcast('angucomplete-alt:clearInput', 'selectedPlayer');
    reset();
  };

  reset();
}

module.exports = ExistingController;
