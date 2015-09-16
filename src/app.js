angular.module('usabilla.leaderboard', ['ui.router', 'LocalStorageModule', 'ngMessages', 'timer', 'cfp.hotkeys'])
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
      .state('count', {
        url: '/count',
        templateUrl: 'src/partials/count.html',
        controller: 'CountController',
        controllerAs: 'count'
      })
      .state('play', {
        url: '/play',
        templateUrl: 'src/partials/play.html',
        controller: 'PlayController',
        controllerAs: 'play',
      })
      .state('result', {
        url: '/result',
        templateUrl: 'src/partials/result.html',
        controller: 'ResultController',
        controllerAs: 'result',
      })
      .state('leaderboard', {
        url: '/leaderboard',
        templateUrl: 'src/partials/leaderboard.html',
        controller: 'LeaderboardController',
        controllerAs: 'leaderboard'
      });

    // Local storage configuration
    localStorageServiceProvider
      .setPrefix('ub.lead')
      .setNotify(true, true);
  })
  .run(function ($rootScope, $state, GameService) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        var states = ['count', 'play', 'result'];
        if (states.indexOf(toState.name) !== -1) {
          var user = GameService.getCurrentUser();
          // If there is no current user, or if the current user has played already
          // then redirect to start
          // TODO: maybe move this to model
          if (angular.isUndefined(user) || isTimeAndNotResult(user, toState.name)) {
            event.preventDefault();
            $state.go('start');
          }
        }

        function isTimeAndNotResult (user, state) {
          return state !== 'result' && angular.isDefined(user.time) && user.time > -1;
        }
      });
  });
