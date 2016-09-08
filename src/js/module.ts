var angular = require('angular');
var uiRouter = require('angular-ui-router');
require('angular-local-storage');
var ngMessages = require('angular-messages');
window['moment'] = require('moment');
window['humanizeDuration'] = require('humanize-duration');
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
  .factory('StorageService', require('./services/storage.service.ts'))
  .factory('GameService', require('./services/game.service.ts'))
  .factory('ExportService', require('./services/export.service.ts'))
  .controller('CountController', require('./controllers/count.controller.ts'))
  .controller('LeaderboardController', require('./controllers/leaderboard.controller.ts'))
  .controller('PlayController', require('./controllers/play.controller.ts'))
  .controller('RegisterController', require('./controllers/register.controller.ts'))
  .controller('ExistingController', require('./controllers/existing.controller.ts'))
  .controller('ResultController', require('./controllers/result.controller.ts'))
  .controller('StartController', require('./controllers/start.controller.ts'))
  .controller('CreateController', require('./controllers/create.controller.ts'))
  .controller('SelectController', require('./controllers/select.controller.ts'))
  .directive('available', require('./directives/available.directive.ts'))
  .directive('freeEmail', require('./directives/freeEmail.directive.ts'))
  .filter('ordinal', require('./filters/ordinal.filter.ts'));
