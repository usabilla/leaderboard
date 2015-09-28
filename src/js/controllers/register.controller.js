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

  register.isInvalid = function isInvalid (field) {
    return (field.$touched && field.$invalid) || $scope.userForm.$submitted;
  }
}

module.exports = RegisterController;
