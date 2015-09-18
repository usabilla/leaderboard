/*@ngInject*/
function StartController (GameService) {
  var start = this;

  start.heading = 'The Usabilla Balls of Fire';

  GameService.resetCurrentUser();
}

module.exports = StartController;
