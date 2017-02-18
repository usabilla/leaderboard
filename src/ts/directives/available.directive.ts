import {Player} from '../models/player.model';
import {GameService} from '../services/game.service';

/*@ngInject*/
export function AvailableDirective (GameService: GameService) {
  return {
    require: 'ngModel',
    link: function (
      scope: angular.IScope,
      element: angular.IAugmentedJQuery,
      attrs: angular.IAttributes,
      ngModel: angular.INgModelController
    ) {

      function setAsAvailable (bool: boolean): void {
        ngModel.$setValidity('available', bool);
      }

      ngModel.$parsers.push(function (value: string): string {
        if (!value || value.length === 0) return;

        setAsAvailable(false);

        let player = new Player();
        player.workEmail = value;

        if (GameService.isPlayerRegistered(player)) {
          setAsAvailable(true);
        } else {
          setAsAvailable(false);
        }

        return value;
      });
    }
  };
}
