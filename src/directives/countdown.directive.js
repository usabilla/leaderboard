angular.module('usabilla.leaderboard')
  .directive('countdown', ['$scope', '$timeout', function ($scope, $timeout) {
    return {
      name: 'countdown',
      scope: {
        counter: '='
      },
      controller: ['$scope', '$element', '$attra', '$transclude', function ($scope, $element, $attrs, $transclude) {
        var countdown = this;
        countdown.counter = $scope.counter;
        var stopped;

        countdown.start = function () {
          stopped = $timeout(function () {
            console.log(countdown.counter);
            countdown.counter--;
            if (countdown.counter === 0) {
              countdown.stop();
            }
            countdown.start();
          }, 1000);
        };

        countdown.stop = function () {
          $timeout.cancel(stopped);
        };
      }],
      controllerAs: 'countdown',
      bindToController: true,
      restrict: 'E',
      templateUrl: 'src/partials/countdown.html',
      replace: true
    };
  }]);
