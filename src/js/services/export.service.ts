import escape = require('core-js/fn/regexp/escape');

/*@ngInject*/
function ExportService () {
  var title = 'Usabilla Balls of Fire';
  var showLabel = true;
  var format = 'data:text/xls;charset=utf-8';

  function generate (data) {
    var json = angular.isObject(data) ? data : angular.fromJson(data);
    var csv = '';

    csv += title + '\r\n\n';

    if (showLabel) {
      var row = '';

      // This loop will extract the label from 1st index of on array
      for (var index in json[0]) {
        // Now convert each value to string and comma-seprated
        row += index + ',';
      }

      row = row.slice(0, -1);

      // append Label row with line break
      csv += row + '\r\n';
    }

    // 1st loop is to extract each row
    for (var i = 0; i < json.length; i++) {
      var row = '';

      // 2nd loop will extract each column and convert it in string comma-seprated
      for (var index in json[i]) {
        row += '' + json[i][index] + ',';
      }

      row.slice(0, row.length - 1);

      // add a line break after each row
      csv += row + '\r\n';
    }

    if (csv == '') {
      alert('Invalid data');
      return;
    }

    // Generate a file name
    // this will remove the blank-spaces from the title and replace it with an underscore
    var fileName = title.replace(/ /g, '_');

    // Initialize file format you want csv or xls
    var uri = format + ',' + escape(csv);

    // this trick will generate a temp <a /> tag
    var link = document.createElement('a');
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout
    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return {
    generate: generate
  };
}

module.exports = ExportService;
