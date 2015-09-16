angular.module('usabilla.leaderboard')
  .factory('GameService', ['StorageService', function (StorageService) {
    var currentUser;

    var service = {
      registerUser: registerUser,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      getUsers: getUsers,
      setUserTime: setUserTime,
      getBestTime: getBestTime,
      getUserPosition: getUserPosition,
      resetCurrentUser: resetCurrentUser
    };

    function registerUser (user) {
      StorageService.save(user);
      service.setCurrentUser(user);
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
      return index + 1;
    }

    function resetCurrentUser () {
      currentUser = undefined;
    }

    function sortUsers () {
      var users = service.getUsers();
      var users = users.sort(compareUsers);
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
  }]);
