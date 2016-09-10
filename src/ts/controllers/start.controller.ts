import {GameService} from '../services/game.service';
import {ExportService} from '../services/export.service';
import {Game} from '../models/game.model';
import {Player} from '../models/player.model';
var _forEach = require('lodash/forEach');

export class StartController {
  private admin: boolean;
  private currentGame: Game;

  /*@ngInject*/
  constructor (
    private GameService: GameService,
    private ExportService: ExportService
  ) {

    this.GameService.resetCurrentPlayer();
    this.currentGame = this.GameService.getCurrentGame();
    this.admin = true;
  }

  generate (): void {
    var players = this.GameService.getPlayers();

    var jsonData = [];
    _forEach(players, (player: Player) => {
      jsonData.push(player.toJSON());
    });

    return this.ExportService.generate(jsonData);
  }
}
