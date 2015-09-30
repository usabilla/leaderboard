/*@ngInject*/
function GameService (StorageService, ngAudio) {
  var currentUser;
  var sounds = {
    'count': ngAudio.load('sounds/count.wav'),
    'go': ngAudio.load('sounds/go.mp3'),
    'play': ngAudio.load('sounds/play.mp3'),
    'buzzer': ngAudio.load('sounds/buzzer.wav'),
    '1': ngAudio.load('sounds/1.mp3'),
    '2': ngAudio.load('sounds/2.mp3'),
    '3': ngAudio.load('sounds/3.mp3'),
    '4': ngAudio.load('sounds/4.mp3'),
    '5': ngAudio.load('sounds/5.mp3')
  };

  var service = {
    registerUser: registerUser,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    getUsers: getUsers,
    setUserTime: setUserTime,
    getBestTime: getBestTime,
    getUserPosition: getUserPosition,
    resetCurrentUser: resetCurrentUser,
    removeUser: removeUser,
    playSound: playSound,
    stopSound: stopSound,
    toggleSound: toggleSound,
    isSoundMuted: isSoundMuted
  };

  function registerUser (user) {
    var newUser = StorageService.save(user);
    if (angular.isUndefined(newUser)) {
      return;
    }
    service.setCurrentUser(newUser);
    return newUser;
  }

  function setCurrentUser (user) {
    currentUser = user;
  }

  function getCurrentUser () {
    return currentUser;
  }

  function getUsers () {
    return StorageService.list();
  }

  function setUserTime (user, time) {
    user.time = time;
    StorageService.update(user);
    service.setCurrentUser(user);
    sortUsers();
  }

  function getBestTime () {
    var users = service.getUsers();
    return users[0].time;
  }

  function getUserPosition (user) {
    var index = StorageService.indexOf(user);
    return index === -1 ? undefined : index + 1;
  }

  function resetCurrentUser () {
    currentUser = undefined;
  }

  function removeUser (user) {
    return StorageService.remove(user);
  }

  /**
   * Play a sound.
   *
   * @param  {String} sound The sound string id.
   */
  function playSound (sound) {
    sounds[sound].play();
  }

  /**
   * Stop a sound.
   *
   * @param  {String} sound The sound string id.
   */
  function stopSound (sound) {
    sounds[sound].stop();
  }

  function toggleSound (sound) {
    var audio = sounds[sound];
    audio.muting = !audio.muting;
  }

  function isSoundMuted (sound) {
    return sounds[sound].muting;
  }

  function sortUsers () {
    var users = service.getUsers();
    users = users.sort(compareUsers);
    StorageService.saveUsers(users);
  }

  function compareUsers(userA, userB) {
    if (userA.time < userB.time)
      return -1;
    if (userA.time > userB.time)
      return 1;
    return 0;
  }

  return service;
}

module.exports = GameService;
