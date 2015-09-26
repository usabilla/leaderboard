/*@ngInject*/
function RegisterController ($state, GameService) {
  var register = this;

  register.user = {};
  register.users = GameService.getUsers();

  register.submit = function submit (user) {
    var registeredUser = GameService.registerUser(user);
    if (angular.isUndefined(registeredUser)) {
      return;
    }
    $state.go('count');
  }
}

module.exports = RegisterController;
