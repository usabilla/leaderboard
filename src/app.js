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
        url: '/count/:workEmail',
        templateUrl: 'src/partials/count.html',
        controller: 'CountController',
        controllerAs: 'count'
      })
      .state('play', {
        url: '/play/:workEmail',
        templateUrl: 'src/partials/play.html',
        controller: 'PlayController',
        controllerAs: 'play',
      })
      .state('leaderboard', {
        url: '/leaderboard',
        templateUrl: 'src/partials/leaderboard.html',
        controller: 'LeaderboardController',
        controllerAs: 'leaderboard'
      });

    // $locationProvider.html5Mode(true);

    // Local storage configuration
    localStorageServiceProvider
      .setPrefix('ub.lead')
      .setNotify(true, true);
  });
