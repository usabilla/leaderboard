var _forEach = require('lodash/forEach');

/*@ngInject*/
function StartController (GameService, ExportService) {
  var start = this;

  GameService.resetCurrentPlayer();

  start.admin = true;

  start.generate = function generate () {
    var players = GameService.getPlayers();

    var jsonData = [];
    _forEach(players, function playerToJson (player) {
      jsonData.push(player.toJSON());
    });

    return ExportService.generate(jsonData);
  };
}

module.exports = StartController;
