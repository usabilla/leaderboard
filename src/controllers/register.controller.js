angular.module('usabilla.leaderboard')
  .controller('RegisterController', ['$scope', '$state', 'StorageService', 'UserService',
    function ($scope, $state, StorageService, UserService) {
      var register = this;

      register.user = {};

      register.submit = function () {
        // check if fails
        StorageService.save(register.user);
        UserService.setUser(register.user);
        $state.go('count');
      }
    }
  ]);
