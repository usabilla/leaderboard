/*@ngInject*/
function GameService (StorageService, ngAudio) {
  var currentUser;
  var sounds = {
    'count': ngAudio.load('sounds/count.wav')
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
    playSound: playSound,
    muteSound: muteSound,
    unmuteSound: unmuteSound
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

  function playSound (sound) {
    sounds[sound].play();
  }

  function muteSound () {
    ngAudio.mute();
  }

  function unmuteSound () {
    ngAudio.unmute();
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
