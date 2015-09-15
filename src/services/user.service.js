angular.module('usabilla.leaderboard')
  .factory('UserService', function () {
    var service = {};

    service.user = {};

    service.setUser = function setUser (user) {
      service.user = user;
    }

    service.getUser = function getUser () {
      return service.user;
    }

    return service;
  });
