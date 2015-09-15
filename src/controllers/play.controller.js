angular.module('usabilla.leaderboard')
  .controller('PlayController', ['$scope', '$state', 'StorageService', 'hotkeys', 'UserService',
    function($scope, $state, StorageService, hotkeys, UserService) {
      var play = this;

      play.user = UserService.getUser();

      play.begin = function begin () {
        $scope.$apply(function () {
          play.shouldCountdown = false
        });
        $scope.$broadcast('timer-start');
      };

      hotkeys.add({
        combo: 'space',
        description: 'Game Over!',
        callback: function () {
          $scope.$broadcast('timer-stop');
        }
      });

      $scope.$on('timer-stopped', function (event, data){
        var time = (data.minutes * 60000) + (data.seconds * 1000) + (data.millis / 10.0);
        play.user.time = time;
        StorageService.update(play.user);
        UserService.setUser(play.user);
        $state.go('result');
      });
    }
  ]);
