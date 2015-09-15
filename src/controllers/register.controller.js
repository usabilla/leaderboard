angular.module('usabilla.leaderboard')
  .controller('RegisterController', ['$scope', '$state', 'StorageService',
    function ($scope, $state, StorageService) {
      var register = this;

      register.user = {};

      register.submit = function () {
        // check if fails
        StorageService.save(register.user);
        $state.go('count', {workEmail: register.user.workEmail});
      }
    }
  ]);
