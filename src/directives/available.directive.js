angular.module('usabilla.leaderboard')
  .directive('available', ['StorageService', function(StorageService) {
    return {
      require : 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        function setAsAvailable(bool) {
          ngModel.$setValidity('available', bool);
        }

        ngModel.$parsers.push(function (value) {
          if(!value || value.length == 0) return;

          setAsAvailable(false);

          var user = {workEmail: value};
          var index = StorageService.indexOf(user);

          if (index === -1) {
            setAsAvailable(true);
          } else {
            setAsAvailable(false);
          }

          return value;
        })
      }
    }
  }]);
