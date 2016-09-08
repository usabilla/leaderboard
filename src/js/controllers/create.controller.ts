/*@ngInject*/
function CreateController ($state, GameService) {
  var create = this;

  create.submit = function submit (name) {
    GameService.createGame(name);
    $state.go('select');
  }
}

module.exports = CreateController;
