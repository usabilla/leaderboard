angular.module('usabilla.leaderboard')
  .controller('CountController', ['$scope', '$state', 'StorageService', 'UserService',
    function($scope, $state, StorageService, UserService) {
      var count = this;

      count.user = UserService.getUser();

      count.begin = function begin () {
        $scope.$apply(function () {
          count.shouldCountdown = false
        });
        $state.go('play');
      };
    }
  ]);
