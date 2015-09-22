/*@ngInject*/
function RegisterController ($scope, $state, GameService) {
  var register = this;

  register.user = {};
  register.selectedUser = undefined;
  register.users = GameService.getUsers();
  register.incompleteUsers = register.users.filter(function (user) {
    return !('time' in user);
  })
  register.heading = 'Do you have what it takes to win?';
  register.existing = false;

  register.submit = function submit (user) {
    var registeredUser = GameService.registerUser(user);
    if (angular.isUndefined(registeredUser)) {
      return;
    }
    $state.go('count');
  }

  register.select = function select (user) {
    if (angular.isUndefined(user)) {
      return;
    }
    // check if selected user has time, then return message
    GameService.setCurrentUser(user);
    $state.go('count');
  }

  register.toggleExisting = function toggleExisting (existing) {
    register.existing = !register.existing;
  };
}

module.exports = RegisterController;
