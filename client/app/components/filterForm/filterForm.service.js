import _ from 'lodash';

export default class FilterFormService {

  constructor() {

    this.values = {};
    this.activeFilters = {};
    this.availableFilters = {};
    this.filterList = {
      source: {
        label: 'Source',
        menuIcon: 'input'
      },
      tag: {
        label: 'Tag',
        menuIcon: 'label'
      },
      copyright: {
        label: 'Copyright',
        menuIcon: 'copyright'
      },
      timeframe: {
        label: 'Time frame',
        menuIcon: 'access_time'
      },
      length: {
        label: 'Length, sec',
        menuIcon: 'timelapse'
      },
      location: {
        label: 'Location',
        menuIcon: 'my_location'
      },
      shapeType: {
        label: 'Shape type',
        menuIcon: 'my_location'
      }
    };
    // at the beginning we have all available filters to select
    this.availableFilters = _.clone(this.filterList);
  }

  addFilter(controlName) {
    if (!_.isEmpty(this.activeFilters[controlName])) return;

    this.activeFilters[controlName] = this.filterList[controlName];
    delete this.availableFilters[controlName];
  }

  removeFilter(controlName) {
    if (_.isEmpty(this.activeFilters[controlName])) return;

    delete  this.activeFilters[controlName];
    delete  this.values[controlName];
    this.availableFilters[controlName] = this.filterList[controlName];
  }

  isEmptyActiveFilters() {
    return _.isEmpty(this.activeFilters);
  }

  isEmptyAvailableFilters() {
    return _.isEmpty(this.availableFilters);
  }

  oneAvailableFilterLeft() {
    return _.size(this.availableFilters) == 1;
  }
}
