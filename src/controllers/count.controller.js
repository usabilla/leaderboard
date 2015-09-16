angular.module('usabilla.leaderboard')
  .controller('CountController', ['$scope', '$state', 'GameService',
    function($scope, $state, GameService) {
      var count = this;

      count.user = GameService.getCurrentUser();

      count.begin = function begin () {
        $scope.$apply(function () {
          count.shouldCountdown = false
        });
        $state.go('play');
      };
    }
  ]);
