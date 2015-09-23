/*@ngInject*/
function Run ($rootScope, $state, GameService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var states = ['count', 'play', 'result'];
    if (states.indexOf(toState.name) !== -1) {
      var user = GameService.getCurrentUser();
      // If there is no current user then redirect to start
      if (angular.isUndefined(user)) {
        event.preventDefault();
        $state.go('start');
      }
    }
  });
}

module.exports = Run;
