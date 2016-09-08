var Game = require('../models/game.model');
var Player = require('../models/player.model');
var _forEach = require('lodash/forEach');

/*@ngInject*/
function GameService (StorageService, ngAudio) {
  var currentPlayer;
  var previousPosition;
  var currentGame;
  var sounds = {
    'buzzer': ngAudio.load('dist/sounds/buzzer.mp3'),
    'first': ngAudio.load('dist/sounds/first.mp3'),
    '1': ngAudio.load('dist/sounds/1.mp3'),
    '2': ngAudio.load('dist/sounds/2.mp3'),
    '3': ngAudio.load('dist/sounds/3.mp3'),
    '4': ngAudio.load('dist/sounds/4.mp3'),
    '5': ngAudio.load('dist/sounds/5.mp3')
  };

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
    playSound: playSound,
    stopSound: stopSound,
    toggleSound: toggleSound,
    isSoundMuted: isSoundMuted,
    isFirst: isFirst,
    selectGame: selectGame,
    getGames: getGames,
    createGame: createGame,
    isPlayerRegistered: isPlayerRegistered
  };

  /**
   * Create a new game with the given name.
   * @param {string} name
   */
  function createGame (name) {
    if (!name) {
      return;
    }

    var game = new Game();

    game.setName(name);

    StorageService.save(game);
  }

  /**
   * Get the list of games.
   * @returns {Game[]}
   */
  function getGames () {
    var objects = StorageService.getAll();

    var games = [];
    _forEach(objects, function instantiateGame (object) {
      var game = new Game();

      game.setName(object.name);

      _forEach(object.players, function instantiatePlayer (playerObject) {
        var player = new Player();

        player.setFirstName(playerObject.firstName);
        player.setLastName(playerObject.lastName);
        player.setWorkEmail(playerObject.workEmail);
        player.setJobTitle(playerObject.jobTitle);
        player.setCompany(playerObject.company);
        player.setTime(playerObject.time);

        game.addPlayer(player);
      });

      games.push(game);
    });

    return games;
  }

  /**
   * Set the current game.
   * @param {Game} game
   */
  function selectGame (game) {
    currentGame = game;
  }

  /**
   *
   * @param {Object} object
   * @returns {Player|undefined}
   */
  function registerPlayer (object) {
    if (!object) {
      return;
    }

    var newPlayer = new Player();
    newPlayer.setFirstName(object.firstName);
    newPlayer.setLastName(object.lastName);
    newPlayer.setWorkEmail(object.workEmail);
    newPlayer.setJobTitle(object.jobTitle);
    newPlayer.setCompany(object.company);

    currentGame.addPlayer(newPlayer);

    save();

    service.setCurrentPlayer(newPlayer);

    return newPlayer;
  }

  /**
   * Set the current player and update the current position.
   * @param {Player} player
   */
  function setCurrentPlayer (player) {
    currentPlayer = player;
    previousPosition = service.getPlayerPosition(player);
  }

  /**
   * Get the current player.
   * @returns {Player}
   */
  function getCurrentPlayer () {
    return currentPlayer;
  }

  /**
   * Get the current game.
   * @returns {Game}
   */
  function getCurrentGame () {
    return currentGame;
  }

  /**
   * Get all players for the selected game.
   * @returns {Player[]}
   */
  function getPlayers () {
    return currentGame.getPlayers();
  }

  /**
   * Record the time for this player, sort the players,
   * and set the current player.
   * @param {Player} player
   * @param {number} time
   */
  function setPlayerTime (player, time) {
    player.setTime(time);

    currentGame.sortPlayers();

    save();

    service.setCurrentPlayer(player);
  }

  /**
   * Get the current best time.
   * @returns {number|undefined}
   */
  function getBestTime () {
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
  function getPlayerPosition (player) {
    var index = currentGame.getPlayerPosition(player);
    return index === -1 ? undefined : index + 1;
  }

  /**
   * Reset the current player.
   */
  function resetCurrentPlayer () {
    currentPlayer = undefined;
  }

  /**
   * Remove the selected player.
   * @param {Player} player
   */
  function removePlayer (player) {
    currentGame.removePlayer(player);

    save();
  }

  /**
   * Save the current game state to storage.
   */
  function save () {
    StorageService.update(currentGame);
  }

  /**
   * Determine if given player is first.
   * @param {Player} player
   * @returns {boolean}
   */
  function isFirst (player) {
    return service.getPlayerPosition(player) === 1;
  }

  function isPlayerRegistered (player) {
    return currentGame.getPlayerPosition(player);
  }

  // TODO: the audio stuff should be moved to AudioService
  /**
   * Play a sound.
   *
   * @param  {String} sound The sound string id.
   */
  function playSound (sound) {
    var audio = sounds[sound];
    if (angular.isUndefined(audio)) {
      return;
    }
    audio.play();
  }

  /**
   * Stop a sound.
   *
   * @param  {String} sound The sound string id.
   */
  function stopSound (sound) {
    var audio = sounds[sound];
    if (angular.isUndefined(audio)) {
      return;
    }
    audio.stop();
  }

  function toggleSound (sound) {
    var audio = sounds[sound];
    if (angular.isUndefined(audio)) {
      return;
    }
    audio.muting = !audio.muting;
  }

  function isSoundMuted (sound) {
    var audio = sounds[sound];
    if (angular.isUndefined(audio)) {
      return;
    }
    return audio.muting;
  }

  return service;
}

module.exports = GameService;
