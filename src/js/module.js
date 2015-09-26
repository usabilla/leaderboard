require('./templates');

angular.module('usabilla.leaderboard', [
    'templates',
    'ui.router',
    'LocalStorageModule',
    'ngMessages',
    'timer',
    'cfp.hotkeys',
    'angucomplete-alt',
    'ngAudio'
  ])
  .config(require('./config/config'))
  .run(require('./config/run'))
  .factory('StorageService', require('./services/storage.service'))
  .factory('GameService', require('./services/game.service'))
  .factory('ExportService', require('./services/export.service'))
  .controller('CountController', require('./controllers/count.controller'))
  .controller('LeaderboardController', require('./controllers/leaderboard.controller'))
  .controller('PlayController', require('./controllers/play.controller'))
  .controller('RegisterController', require('./controllers/register.controller'))
  .controller('ExistingController', require('./controllers/existing.controller'))
  .controller('ResultController', require('./controllers/result.controller'))
  .controller('StartController', require('./controllers/start.controller'))
  .directive('available', require('./directives/available.directive'))
  .filter('ordinal', require('./filters/ordinal.filter'));
