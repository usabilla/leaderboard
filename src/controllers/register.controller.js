angular.module('usabilla.leaderboard')
  .controller('RegisterController', ['$scope', '$state', 'GameService',
    function ($scope, $state, GameService) {
      var register = this;

      register.user = {};

      register.submit = function () {
        var user = GameService.registerUser(register.user);
        if (angular.isUndefined(user)) {
          return;
        }
        $state.go('count');
      }
    }
  ]);
