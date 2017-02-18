/*@ngInject*/
export function FreeEmailDirective () {
  return {
    require: 'ngModel',
    link: function (
      scope: angular.IScope,
      element: angular.IAugmentedJQuery,
      attrs: angular.IAttributes,
      ngModel: angular.INgModelController
    ) {

      function setAsFreeEmail (bool: boolean): void {
        ngModel.$setValidity('freeEmail', bool);
      }

      ngModel.$parsers.push(function (value: string): string {
        if (!value || value.length === 0) return;

        setAsFreeEmail(false);

        let re = new RegExp('(gmail|yahoo|hotmail|live|outlook)', 'i');
        let match = re.test(value);

        if (!match) {
          setAsFreeEmail(true);
        } else {
          setAsFreeEmail(false);
        }

        return value;
      });
    }
  };
}
