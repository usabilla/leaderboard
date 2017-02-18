import * as angular from 'angular';

export class ExportService {
  title = 'Usabilla Leaderboard';
  showLabel = true;
  format = 'data:text/xls;charset=utf-8';

  private getTitle (gameName: string): string {
    return `${this.title} - ${gameName}`;
  }

  generate (data, gameName: string): void {
    let json = angular.isObject(data) ? data : angular.fromJson(data);
    let csv = '';

    csv += this.getTitle(gameName) + '\r\n\n';

    if (this.showLabel) {
      let row = '';

      // This loop will extract the label from 1st index of on array
      for (let index in json[0]) {
        // Now convert each value to string and comma-separated
        row += index + ',';
      }

      row = row.slice(0, -1);

      // append Label row with line break
      csv += row + '\r\n';
    }

    // 1st loop is to extract each row
    for (let i = 0; i < json.length; i++) {
      let row = '';

      // 2nd loop will extract each column and convert it in string comma-separated
      for (let index in json[i]) {
        row += '' + json[i][index] + ',';
      }

      row.slice(0, row.length - 1);

      // add a line break after each row
      csv += row + '\r\n';
    }

    if (csv === '') {
      alert('Invalid data');
      return;
    }

    // Generate a file name
    // this will remove the blank-spaces from the title and replace it with an underscore
    let fileName = this.getTitle(gameName).replace(/ /g, '_');

    // Initialize file format you want csv or xls
    let uri = this.format + ',' + encodeURI(csv);

    // this trick will generate a temp <a /> tag
    let link = document.createElement('a');
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout
    link.style.visibility = 'hidden';
    link['download'] = fileName + '.csv';

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
