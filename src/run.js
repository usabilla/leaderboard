/*@ngInject*/
function Run ($rootScope, $state, GameService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var states = ['count', 'play', 'result'];
    if (states.indexOf(toState.name) !== -1) {
      var user = GameService.getCurrentUser();
      // If there is no current user, or if the current user has played already
      // then redirect to start
      // TODO: maybe move this to model
      if (angular.isUndefined(user) || isTimeAndNotResult(user, toState.name)) {
        event.preventDefault();
        $state.go('start');
      }
    }

    function isTimeAndNotResult (user, state) {
      return state !== 'result' && angular.isDefined(user.time) && user.time > -1;
    }
  });
}

module.exports = Run;
