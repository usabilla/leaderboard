interface FileTarget extends EventTarget {
  files: FileList;
}

export function FileDirective () {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function (
      scope: angular.IScope,
      element: angular.IAugmentedJQuery,
      attrs: angular.IAttributes,
      ngModel: angular.INgModelController
    ) {
      element.bind('change', function (event: Event) {
        var files = (event.target as FileTarget).files;
        var file = files[0];

        ngModel.$setViewValue(file);
        scope.$apply();
      });
    }
  };
}
