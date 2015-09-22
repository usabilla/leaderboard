/*@ngInject*/
function StartController (GameService) {
  var start = this;

  GameService.resetCurrentUser();
}

module.exports = StartController;
