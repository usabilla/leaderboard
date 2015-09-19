(function (window) {

  function User (user) {
    this.user = user || {};
    this.user.time = 0;
    this.user.position = 0;
  }

  User.prototype.get = function () {
    return user;
  };

  User.prototype.setTime = function (time) {
    this.user.time = time;
  };

  User.prototype.setPosition = function (position) {
    this.user.position = position;
  };

  window.User = User;

})(window);
