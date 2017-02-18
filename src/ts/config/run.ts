import {GameService} from '../services/game.service';
import * as angular from 'angular';

/*@ngInject*/
export function Run (
  $rootScope: angular.IRootScopeService,
  $state: angular.ui.IStateService,
  GameService: GameService
) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var states = ['select', 'create'];

    if (states.indexOf(toState.name) !== -1) {
      return;
    }

    var game = GameService.getCurrentGame();

    // If there is no current game then redirect to select game.
    if (angular.isUndefined(game)) {
      event.preventDefault();
      $state.go('select');
    }
  });
}
