import {Player} from './player.model';
var _pull = require('lodash/pull');
var _orderBy = require('lodash/orderBy');
var _findIndex = require('lodash/findIndex');

export class Game {
  players: Player[] = [];
  _id: string;
  name: string;

  addPlayer (player: Player): void {
    this.players.push(player);
  }

  removePlayer (player: Player): void {
    _pull(this.players, player);
  }

  getPlayers (): Player[] {
    return this.players;
  }

  sortPlayers (): void {
    this.players = _orderBy(this.players, ['time'], ['asc']);
  }

  getPlayerPosition (player: Player): number {
    if (!player) {
      return -1;
    }

    return _findIndex(this.players, function findIndex (_player) {
      return _player.workEmail === player.workEmail;
    });
  }
}
