angular.module('usabilla.leaderboard')
  .factory('StorageService', ['localStorageService', function (localStorageService) {
    var service = {};

    service.save = function save (user) {
      var key = user.workEmail;
      if (angular.isUndefined(key)) {
        return;
      }
      if (localStorageService.get(key)) {
        // raise validation error
        return;
      }
      localStorageService.set(key, user);
    };

    service.get = function get (workEmail) {
      return localStorageService.get(workEmail);
    };

    service.update = function update (user) {
      var key = user.workEmail;
      localStorageService.set(key, user);
    };

    return service;
  }]);
