/*@ngInject*/
function Config ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('select', {
      url: '/',
      template: require('../../partials/select.html'),
      controller: 'SelectController',
      controllerAs: 'select'
    })
    .state('create', {
      url: '/create',
      template: require('../../partials/create.html'),
      controller: 'CreateController',
      controllerAs: 'create'
    })
    .state('start', {
      url: '/start',
      template: require('../../partials/start.html'),
      controller: 'StartController',
      controllerAs: 'start'
    })
    .state('register', {
      url: '/register',
      template: require('../../partials/register.html'),
      controller: 'RegisterController',
      controllerAs: 'register'
    })
    .state('existing', {
      url: '/existing',
      template: require('../../partials/existing.html'),
      controller: 'ExistingController',
      controllerAs: 'existing'
    })
    .state('count', {
      url: '/count',
      template: require('../../partials/count.html'),
      controller: 'CountController',
      controllerAs: 'count'
    })
    .state('play', {
      url: '/play',
      template: require('../../partials/play.html'),
      controller: 'PlayController',
      controllerAs: 'play'
    })
    .state('result', {
      url: '/result',
      template: require('../../partials/result.html'),
      controller: 'ResultController',
      controllerAs: 'result'
    })
    .state('leaderboard', {
      url: '/leaderboard',
      template: require('../../partials/leaderboard.html'),
      controller: 'LeaderboardController',
      controllerAs: 'leaderboard'
    });

  // Local storage configuration
  localStorageServiceProvider
    .setPrefix('ub.lead')
    .setNotify(true, true);
}

module.exports = Config;