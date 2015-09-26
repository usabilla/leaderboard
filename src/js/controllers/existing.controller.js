/*@ngInject*/
function ExistingController ($state, GameService) {
  var existing = this;

  existing.selectedUser = undefined;
  existing.users = GameService.getUsers();

  existing.select = function select (user) {
    if (angular.isUndefined(user)) {
      return;
    }
    GameService.setCurrentUser(user);
    $state.go('count');
  }
}

module.exports = ExistingController;
