/*@ngInject*/
function FreeEmailDirective () {
  return {
    require : 'ngModel',
    link : function(scope, element, attrs, ngModel) {
      function setAsFreeEmail(bool) {
        ngModel.$setValidity('freeEmail', bool);
      }

      ngModel.$parsers.push(function (value) {
        if(!value || value.length == 0) return;

        setAsFreeEmail(false);

        var re = new RegExp('(gmail|yahoo|hotmail|live|outlook)', 'i');
        var match = re.test(value);

        if (!match) {
          setAsFreeEmail(true);
        } else {
          setAsFreeEmail(false);
        }

        return value;
      })
    }
  }
}

module.exports = FreeEmailDirective;
