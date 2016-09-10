import {AudioService} from './services/audio.service';
import {StorageService} from './services/storage.service';
import {GameService} from './services/game.service';
import {ExportService} from './services/export.service';
import {OrdinalFilter} from './filters/ordinal.filter';
import {AvailableDirective} from './directives/available.directive';
import {FreeEmailDirective} from './directives/freeEmail.directive';
import {Run} from './config/run';
import {Config} from './config/config';
import '../scss/style.scss';

angular.module('usabilla.leaderboard', [
    'ui.router',
    'LocalStorageModule',
    'ngMessages',
    'timer',
    'cfp.hotkeys',
    'angucomplete-alt',
    'ngAudio'
  ])
  .config(Config)
  .run(Run)
  .service('StorageService', StorageService)
  .service('GameService', GameService)
  .service('ExportService', ExportService)
  .service('AudioService', AudioService)
  .directive('available', AvailableDirective)
  .directive('freeEmail', FreeEmailDirective)
  .filter('ordinal', OrdinalFilter);

