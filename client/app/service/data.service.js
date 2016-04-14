export default class dataService {

  constructor($http) {
    "ngInject";

    this.$http = $http;
  }

  getData() {
    console.log(this.$http);
    return ['New York', 'San Francisco', 'Tel-Aviv', 'Los Angeles'];
  }
}
