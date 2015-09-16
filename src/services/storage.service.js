angular.module('usabilla.leaderboard')
  .factory('StorageService', ['localStorageService', function (localStorageService) {
    var key = 'users';

    var service = {
      save: save,
      get: get,
      update: update,
      list: list,
      indexOf: indexOf,
      saveUsers: saveUsers
    };

    function save (user) {
      // if email is not provided return
      if (angular.isUndefined(user.workEmail) || user.workEmail === '') {
        return;
      }
      // if email is already registered return
      if (service.indexOf(user) !== -1) {
        // raise validation error
        return;
      }
      var users = service.list();
      users.push(user);
      localStorageService.set(key, users);
    }

    function get (user) {
      // user does not exist
      var index = service.indexOf(user);
      if (index === -1) {
        // raise validation error
        return;
      }
      var users = service.list();
      return users[index];
    }

    function update (user) {
      var index = service.indexOf(user);
      // user does not exist
      if (index === -1) {
        return;
      }
      var users = service.list();
      users[index] = user;
      localStorageService.set(key, users);
    }

    function indexOf (user) {
      var users = service.list();
      if (angular.isUndefined(users)) {
        return -1;
      }
      var length = users.length;
      if (length < 1) {
        return -1;
      }
      var index = -1;
      for (var i = length - 1; i >= 0; i--) {
        if (users[i].workEmail === user.workEmail) {
          index = i;
        }
      };
      return index;
    }

    function list () {
      return localStorageService.get(key) || [];
    }

    function saveUsers (users) {
      localStorageService.set(key, users);
    }

    return service;
  }]);
