var angular = require('angular');
var uiRouter = require('angular-ui-router');
require('angular-local-storage');
var ngMessages = require('angular-messages');
window.moment = require('moment');
window.humanizeDuration = require('humanize-duration');
var timer = require('angular-timer');
require('angular-hotkeys');
require('angucomplete-alt');
var ngAudio = require('angular-audio');

angular.module('usabilla.leaderboard', [
  uiRouter,
  'LocalStorageModule',
  ngMessages,
  timer.name,
  'cfp.hotkeys',
  'angucomplete-alt',
  ngAudio
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
  .directive('freeEmail', require('./directives/freeEmail.directive'))
  .filter('ordinal', require('./filters/ordinal.filter'));
