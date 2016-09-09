import {GameService} from '../services/game.service';
import {ExportService} from '../services/export.service';
var _forEach = require('lodash/forEach');

export class StartController {
  private admin: boolean;

  /*@ngInject*/
  constructor (
    private GameService: GameService,
    private ExportService: ExportService
  ) {

    this.GameService.resetCurrentPlayer();
    this.admin = true;
  }

  generate (): void {
    var players = this.GameService.getPlayers();

    var jsonData = [];
    _forEach(players, function playerToJson (player) {
      jsonData.push(player.toJSON());
    });

    return this.ExportService.generate(jsonData);
  }
}
