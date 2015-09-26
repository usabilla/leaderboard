/*@ngInject*/
function StartController (GameService, ExportService) {
  var start = this;

  GameService.resetCurrentUser();

  start.admin = false;

  start.generate = function generate () {
    var data = GameService.getUsers();
    return ExportService.generate(data);
  };
}

module.exports = StartController;
