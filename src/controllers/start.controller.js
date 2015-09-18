/*@ngInject*/
function StartController (GameService) {
  GameService.resetCurrentUser();
}

module.exports = StartController;
