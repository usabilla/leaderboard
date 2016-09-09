import {Player} from '../models/player.model';

/*@ngInject*/
function AvailableDirective (GameService) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      function setAsAvailable (bool) {
        ngModel.$setValidity('available', bool);
      }

      ngModel.$parsers.push(function (value) {
        if (!value || value.length == 0) return;

        setAsAvailable(false);

        var player = new Player();
        player.workEmail = value;

        if (GameService.isPlayerRegistered(player)) {
          setAsAvailable(true);
        } else {
          setAsAvailable(false);
        }

        return value;
      })
    }
  }
}

module.exports = AvailableDirective;
