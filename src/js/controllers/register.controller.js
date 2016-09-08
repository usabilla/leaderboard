/*@ngInject*/
function RegisterController ($scope, $state, GameService) {
  var register = this;

  register.player = {};
  register.players = GameService.getPlayers();

  register.submit = function submit (player) {
    if ($scope.playerForm.$invalid) {
      return;
    }
    var registeredPlayer = GameService.registerPlayer(player);
    if (angular.isUndefined(registeredPlayer)) {
      return;
    }
    $state.go('count');
  };

  register.isInvalid = function isInvalid (field) {
    return (field.$touched && field.$invalid) || $scope.playerForm.$submitted;
  };
}

module.exports = RegisterController;
