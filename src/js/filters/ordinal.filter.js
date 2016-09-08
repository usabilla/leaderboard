function OrdinalFilter () {
  return function (input) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = input % 100;

    return (s[(v - 20) % 10] || s[v] || s[0]);
  }
}

module.exports = OrdinalFilter;
