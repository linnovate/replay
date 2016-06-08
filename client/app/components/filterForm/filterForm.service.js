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
      copyright: {
        label: 'Copyright',
        menuIcon: 'copyright'
      },
      timeframe: {
        label: 'Time frame',
        menuIcon: 'access_time'
      },
      length: {
        label: 'Length',
        menuIcon: 'timelapse'
      },
      location: {
        label: 'Location',
        menuIcon: 'my_location'
      }
    };
    // at the beginning we have all available filters to select
    this.availableFilters = _.clone(this.filterList);
  }

  addFilter(controlType) {
    if (!_.isEmpty(this.activeFilters[controlType])) return;

    this.activeFilters[controlType] = this.filterList[controlType];
    delete this.availableFilters[controlType];
  }

  removeFilter(controlType) {
    if (_.isEmpty(this.activeFilters[controlType])) return;

    delete  this.activeFilters[controlType];
    delete  this.values[controlType];
    this.availableFilters[controlType] = this.filterList[controlType];
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
