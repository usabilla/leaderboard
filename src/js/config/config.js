function Config ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('start', {
        url: '/',
        templateUrl: 'start.html',
        controller: 'StartController',
        controllerAs: 'start'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'register.html',
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      .state('count', {
        url: '/count',
        templateUrl: 'count.html',
        controller: 'CountController',
        controllerAs: 'count'
      })
      .state('play', {
        url: '/play',
        templateUrl: 'play.html',
        controller: 'PlayController',
        controllerAs: 'play',
      })
      .state('result', {
        url: '/result',
        templateUrl: 'result.html',
        controller: 'ResultController',
        controllerAs: 'result',
      })
      .state('leaderboard', {
        url: '/leaderboard',
        templateUrl: 'leaderboard.html',
        controller: 'LeaderboardController',
        controllerAs: 'leaderboard'
      });

    // Local storage configuration
    localStorageServiceProvider
      .setPrefix('ub.lead')
      .setNotify(true, true);
  }

module.exports = Config;
