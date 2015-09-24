/*@ngInject*/
function StartController (GameService, ExportService) {
  var start = this;

  GameService.resetCurrentUser();

  start.generate = function generate () {
    return ExportService.generate();
  };
}

module.exports = StartController;
