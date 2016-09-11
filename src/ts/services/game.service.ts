import {Game} from '../models/game.model';
import {Player} from '../models/player.model';
import {StorageService} from './storage.service';
import {AudioService} from './audio.service';

var randomstring = require('randomstring');
var _forEach = require('lodash/forEach');

export class GameService {
  private currentPlayer: Player;
  private previousPosition: number;
  private currentGame: Game;

  /*@ngInject*/
  constructor (
    private StorageService: StorageService,
    private AudioService: AudioService
  ) {
  }

  /**
   * Create a new game with the given name.
   * @param {string} name
   * @returns {Game}
   */
  createGame (name: string): Game {
    if (!name) {
      return;
    }

    var game = new Game();

    game._id = randomstring.generate();
    game.name = name;

    return this.StorageService.save(game);
  }

  /**
   * Get the list of games.
   * @returns {Game[]}
   */
  getGames (): angular.IPromise<Game[]> {
    // TODO: games and players should be created only once not every time we want to get them
    return this.StorageService.getAll()
      .then((docs) => {
        var games = [];

        _forEach(docs, (doc) => {
          var game = new Game();

          game._id = doc.doc._id;
          game.name = doc.doc.name;
          game.playAudioFilePath = doc.doc.playAudioFilePath;

          if (game.playAudioFilePath) {
            this.AudioService.registerSound('play', game.playAudioFilePath);
          }

          _forEach(doc.doc.players, (playerObject) => {
            var player = new Player();

            player.firstName = playerObject.firstName;
            player.lastName = playerObject.lastName;
            player.workEmail = playerObject.workEmail;
            player.jobTitle = playerObject.jobTitle;
            player.company = playerObject.company;
            player.time = playerObject.time;

            game.addPlayer(player);
          });

          games.push(game);
        });

        return games;
      });
  }

  /**
   * Set the current game.
   * @param {Game} game
   */
  selectGame (game: Game): void {
    this.currentGame = game;
  }

  /**
   *
   * @param {Object} object
   * @returns {Player|undefined}
   */
  registerPlayer (object): Player {
    if (!object) {
      return;
    }

    var newPlayer = new Player();
    newPlayer.firstName = object.firstName;
    newPlayer.lastName = object.lastName;
    newPlayer.workEmail = object.workEmail;
    newPlayer.jobTitle = object.jobTitle;
    newPlayer.company = object.company;

    this.currentGame.addPlayer(newPlayer);

    this.save();

    this.setCurrentPlayer(newPlayer);

    return newPlayer;
  }

  /**
   * Set the current player and update the current position.
   * @param {Player} player
   */
  setCurrentPlayer (player: Player): void {
    this.currentPlayer = player;
    this.previousPosition = this.getPlayerPosition(player);
  }

  /**
   * Get the current player.
   * @returns {Player}
   */
  getCurrentPlayer (): Player {
    return this.currentPlayer;
  }

  /**
   * Get the current game.
   * @returns {Game}
   */
  getCurrentGame (): Game {
    return this.currentGame;
  }

  /**
   * Get all players for the selected game.
   * @returns {Player[]}
   */
  getPlayers (): Player[] {
    return this.currentGame.getPlayers();
  }

  /**
   * Record the time for this player, sort the players,
   * and set the current player.
   * @param {Player} player
   * @param {number} time
   */
  setPlayerTime (player: Player, time: number): void {
    player.time = time;

    this.currentGame.sortPlayers();

    this.save();

    this.setCurrentPlayer(player);
  }

  /**
   * Get the current best time.
   * @returns {number|undefined}
   */
  getBestTime (): number {
    var players = this.currentGame.getPlayers();

    if (players.length <= 1) {
      return;
    }

    var index = (this.previousPosition === 1) ? 1 : 0;

    return players[index].time;
  }

  /**
   * Get the position of the given player.
   * @param {Player} player
   * @returns {number|undefined}
   */
  getPlayerPosition (player: Player): number {
    var index = this.currentGame.getPlayerPosition(player);
    return index === -1 ? undefined : index + 1;
  }

  /**
   * Reset the current player.
   */
  resetCurrentPlayer (): void {
    this.currentPlayer = undefined;
  }

  /**
   * Remove the selected player.
   * @param {Player} player
   */
  removePlayer (player: Player): void {
    this.currentGame.removePlayer(player);

    this.save();
  }

  /**
   * Save the current game state to storage, using the id
   * of the game and the updated players array.
   */
  save (): angular.IPromise<void> {
    return this.StorageService.update(this.currentGame._id, this.currentGame.toJSON());
  }

  /**
   * Determine if given player is first.
   * @param {Player} player
   * @returns {boolean}
   */
  isFirst (player: Player): boolean {
    return this.getPlayerPosition(player) === 1;
  }

  isPlayerRegistered (player: Player): number {
    return this.currentGame.getPlayerPosition(player);
  }
}
