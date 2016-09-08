var _pull = require('lodash/pull');
var _orderBy = require('lodash/orderBy');
var _findIndex = require('lodash/findIndex');

function Game () {
  this.players = [];
}

Game.prototype.setName = function setName (name) {
  this.name = name;
};

Game.prototype.addPlayer = function addPlayer (player) {
  this.players.push(player);
};

Game.prototype.removePlayer = function removePlayer (player) {
  _pull(this.players, player);
};

Game.prototype.getPlayers = function getPlayers () {
  return this.players;
};

Game.prototype.sortPlayers = function sortPlayers () {
  this.players = _orderBy(this.players, ['time'], ['asc']);
};

Game.prototype.getPlayerPosition = function getPlayerPosition (player) {
  if (!player) {
    return -1;
  }

  return _findIndex(this.players, function findIndex (_player) {
    return _player.workEmail === player.workEmail;
  });
};

module.exports = Game;
