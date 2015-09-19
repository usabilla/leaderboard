/*@ngInject*/
function ResultController ($scope, GameService) {
  var result = this;

  result.user = GameService.getCurrentUser();
  result.position = GameService.getUserPosition(result.user);
}

module.exports = ResultController;
