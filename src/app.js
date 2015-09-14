angular.module('usabilla.leaderboard', ['ui.router', 'LocalStorageModule', 'ngMessages'])
  .controller('StartController', ['$scope', function($scope){
    $scope.message = 'Welcome!';
  }])
  .controller('RegisterController', [
    '$scope', 'localStorageService', '$state',
    function($scope, localStorageService, $state){
      var register = this;

      register.user = {};

      register.submit = function () {
        var key = register.user.workEmail;
        if (angular.isUndefined(key)) {
          return;
        }
        if (localStorageService.get(key)) {
          // raise validation error
          return;
        }
        localStorageService.set(key, register.user);
        $state.go('play', {user: register.user});
      }
    }
  ])
  .controller('PlayController', ['$scope', 'user', function($scope, user){
    var play = this;

    play.user = user;
  }])
  .controller('LeaderboardController', ['$scope', function($scope){
    $scope.message = 'Leaderboard';
  }])
  .directive('countdown', ['$scope', '$timeout', function($scope, $timeout){
    return {
      name: 'countdown',
      scope: {
        counter: '='
      },
      controller: ['$scope', '$element', '$attra', '$transclude', function($scope, $element, $attrs, $transclude) {
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
  }])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'src/partials/start.html',
      controller: 'StartController',
      controllerAs: 'start'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'src/partials/register.html',
      controller: 'RegisterController',
      controllerAs: 'register'
    })
    .state('play', {
      url: '/play',
      templateUrl: 'src/partials/play.html',
      controller: 'PlayController',
      controllerAs: 'play',
      resolve: {
        user: function ($stateParams) {
          return $stateParams.user;
        }
      }
    })
    .state('leaderboard', {
      url: '/leaderboard',
      templateUrl: 'src/partials/leaderboard.html',
      controller: 'LeaderboardController',
      controllerAs: 'leaderboard'
    });

    $locationProvider.html5Mode(true);

    // Local storage configuration
    localStorageServiceProvider
      .setPrefix('ub.lead')
      .setNotify(true, true);
  });
