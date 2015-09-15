angular.module('usabilla.leaderboard')
  .controller('PlayController', ['$scope', 'user', function($scope, user) {
    var play = this;

    play.user = user;
  }]);
