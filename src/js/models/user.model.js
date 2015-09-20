function User (user) {
  this.user = user || {};
  this.user.time = 0;
  this.user.position = 0;
}

User.prototype.get = function get () {
  return user;
};

User.prototype.setTime = function setTime (time) {
  this.user.time = time;
};

User.prototype.setPosition = function setPosition (position) {
  this.user.position = position;
};

module.exports = User;
