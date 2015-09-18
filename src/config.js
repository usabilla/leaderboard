function Config ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
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
  }

module.exports = Config;
