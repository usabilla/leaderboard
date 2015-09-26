/*@ngInject*/
function RegisterController ($scope, $state, GameService) {
  var register = this;

  register.user = {};
  register.users = GameService.getUsers();

  register.submit = function submit (user) {
    if ($scope.userForm.$invalid) {
      return;
    }
    var registeredUser = GameService.registerUser(user);
    if (angular.isUndefined(registeredUser)) {
      return;
    }
    $state.go('count');
  }
}

module.exports = RegisterController;
