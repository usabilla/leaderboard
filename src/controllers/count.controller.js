angular.module('usabilla.leaderboard')
  .controller('CountController', ['$scope', '$stateParams', '$state', 'StorageService',
    function($scope, $stateParams, $state, StorageService) {
      var count = this;

      var workEmail = $stateParams.workEmail;
      count.user = StorageService.get(workEmail);

      count.begin = function begin () {
        $scope.$apply(function () {
          count.shouldCountdown = false
        });
        $state.go('play', {workEmail: workEmail});
      };
    }
  ]);
