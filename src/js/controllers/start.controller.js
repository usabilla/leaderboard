/*@ngInject*/
function StartController (GameService, ExportService) {
  var start = this;

  GameService.resetCurrentPlayer();

  start.admin = true;

  start.generate = function generate () {
    var data = GameService.getPlayers();
    return ExportService.generate(data);
  };
}

module.exports = StartController;
