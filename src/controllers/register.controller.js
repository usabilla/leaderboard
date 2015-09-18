angular.module('usabilla.leaderboard')
  .controller('RegisterController', ['$scope', '$state', 'GameService',
    function ($scope, $state, GameService) {
      var register = this;

      register.user = {};
      register.selectedUser = undefined;
      register.users = GameService.getUsers();

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
        GameService.setCurrentUser(user);
        $state.go('count');
      }
    }
  ]);
