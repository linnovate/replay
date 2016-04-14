export default class Feature1Controller {

  constructor(dataService) {
    "ngInject";

    this.name = 'feature1';
    this.cities = dataService.getData();
  }
}
