/*@ngInject*/
function ExistingController ($state, $scope, GameService) {
  var existing = this;

  function reset () {
    existing.selectedUser = undefined;
    existing.users = GameService.getUsers();
  }

  existing.select = function select (user) {
    if (angular.isUndefined(user)) {
      return;
    }
    GameService.setCurrentUser(user);
    $state.go('count');
  }

  existing.remove = function remove (user) {
    if (angular.isUndefined(user)) {
      return;
    }
    if (GameService.removeUser(user)) {
      $scope.$broadcast('angucomplete-alt:clearInput', 'selectedUser');
      reset();
    }
  }

  reset();
}

module.exports = ExistingController;
