import {EditGameComponent} from './components/edit-game/edit-game.component';
import {AudioService} from './services/audio.service';
import {StorageService} from './services/storage.service';
import {GameService} from './services/game.service';
import {ExportService} from './services/export.service';
import {OrdinalFilter} from './filters/ordinal.filter';
import {AvailableDirective} from './directives/available.directive';
import {FreeEmailDirective} from './directives/freeEmail.directive';
import {FileDirective} from './directives/file.directive';
import {Run} from './config/run';
import {Config} from './config/config';
import '../scss/style.scss';
import * as angular from 'angular';

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
  .constant('sounds', {
    'buzzer': require('../sounds/buzzer.mp3'),
    'first': require('../sounds/first.mp3'),
    '1': require('../sounds/1.mp3'),
    '2': require('../sounds/2.mp3'),
    '3': require('../sounds/3.mp3'),
    '4': require('../sounds/4.mp3'),
    '5': require('../sounds/5.mp3')
  })
  .service('StorageService', StorageService)
  .service('GameService', GameService)
  .service('ExportService', ExportService)
  .service('AudioService', AudioService)
  .directive('available', AvailableDirective)
  .directive('freeEmail', FreeEmailDirective)
  .directive('file', FileDirective)
  .filter('ordinal', OrdinalFilter)
  .component('editGame', EditGameComponent);
