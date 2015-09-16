angular.module('usabilla.leaderboard')
  .controller('RegisterController', ['$scope', '$state', 'GameService',
    function ($scope, $state, GameService) {
      var register = this;

      register.user = {};

      register.submit = function () {
        // TODO: same user is saved, fix it
        GameService.registerUser(register.user);
        $state.go('count');
      }
    }
  ]);
