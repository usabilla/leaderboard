import {Game} from '../models/game.model';
import {Player} from '../models/player.model';
var randomstring = require('randomstring');
var _forEach = require('lodash/forEach');

/*@ngInject*/
function GameService (StorageService) {
  var currentPlayer;
  var previousPosition;
  var currentGame;

  var service = {
    registerPlayer: registerPlayer,
    setCurrentPlayer: setCurrentPlayer,
    getCurrentPlayer: getCurrentPlayer,
    getCurrentGame: getCurrentGame,
    getPlayers: getPlayers,
    setPlayerTime: setPlayerTime,
    getBestTime: getBestTime,
    getPlayerPosition: getPlayerPosition,
    resetCurrentPlayer: resetCurrentPlayer,
    removePlayer: removePlayer,
    isFirst: isFirst,
    selectGame: selectGame,
    getGames: getGames,
    createGame: createGame,
    isPlayerRegistered: isPlayerRegistered
  };

  /**
   * Create a new game with the given name.
   * @param {string} name
   * @returns {Game}
   */
  function createGame (name: string): Game {
    if (!name) {
      return;
    }

    var game = new Game();

    game._id = randomstring.generate();
    game.name = name;

    return StorageService.save(game);
  }

  /**
   * Get the list of games.
   * @returns {Game[]}
   */
  function getGames (): Game[] {
    return StorageService.getAll()
      .then((docs) => {
        var games = [];

        _forEach(docs, (doc) => {
          var game = new Game();

          game._id = doc.doc._id;
          game.name = doc.doc.name;

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
  function selectGame (game: Game): void {
    currentGame = game;
  }

  /**
   *
   * @param {Object} object
   * @returns {Player|undefined}
   */
  function registerPlayer (object): Player {
    if (!object) {
      return;
    }

    var newPlayer = new Player();
    newPlayer.firstName = object.firstName;
    newPlayer.lastName = object.lastName;
    newPlayer.workEmail = object.workEmail;
    newPlayer.jobTitle = object.jobTitle;
    newPlayer.company = object.company;

    currentGame.addPlayer(newPlayer);

    save();

    service.setCurrentPlayer(newPlayer);

    return newPlayer;
  }

  /**
   * Set the current player and update the current position.
   * @param {Player} player
   */
  function setCurrentPlayer (player: Player): void {
    currentPlayer = player;
    previousPosition = service.getPlayerPosition(player);
  }

  /**
   * Get the current player.
   * @returns {Player}
   */
  function getCurrentPlayer (): Player {
    return currentPlayer;
  }

  /**
   * Get the current game.
   * @returns {Game}
   */
  function getCurrentGame (): Game {
    return currentGame;
  }

  /**
   * Get all players for the selected game.
   * @returns {Player[]}
   */
  function getPlayers (): Player[] {
    return currentGame.getPlayers();
  }

  /**
   * Record the time for this player, sort the players,
   * and set the current player.
   * @param {Player} player
   * @param {number} time
   */
  function setPlayerTime (player: Player, time: number): void {
    player.time = time;

    currentGame.sortPlayers();

    save();

    service.setCurrentPlayer(player);
  }

  /**
   * Get the current best time.
   * @returns {number|undefined}
   */
  function getBestTime (): number {
    var players = currentGame.getPlayers();

    if (players.length <= 1) {
      return;
    }

    var index = (previousPosition === 1) ? 1 : 0;

    return players[index].time;
  }

  /**
   * Get the position of the given player.
   * @param {Player} player
   * @returns {number|undefined}
   */
  function getPlayerPosition (player: Player): number {
    var index = currentGame.getPlayerPosition(player);
    return index === -1 ? undefined : index + 1;
  }

  /**
   * Reset the current player.
   */
  function resetCurrentPlayer (): void {
    currentPlayer = undefined;
  }

  /**
   * Remove the selected player.
   * @param {Player} player
   */
  function removePlayer (player: Player): void {
    currentGame.removePlayer(player);

    save();
  }

  /**
   * Save the current game state to storage, using the id
   * of the game and the updated players array.
   */
  function save (): void {
    return StorageService.update(currentGame._id, {
      players: currentGame.players
    });
  }

  /**
   * Determine if given player is first.
   * @param {Player} player
   * @returns {boolean}
   */
  function isFirst (player: Player): boolean {
    return service.getPlayerPosition(player) === 1;
  }

  function isPlayerRegistered (player: Player): number {
    return currentGame.getPlayerPosition(player);
  }

  return service;
}

module.exports = GameService;
