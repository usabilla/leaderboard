angular.module('usabilla.leaderboard')
  .controller('RegisterController', ['$scope', '$state', 'StorageService',
    function ($scope, $state, StorageService) {
      var register = this;

      register.user = {};

      register.submit = function () {
        StorageService.save(register.user);
        $state.go('play', {user: register.user});
      }
    }
  ]);
