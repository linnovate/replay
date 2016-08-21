import _ from 'lodash';

class FilterFormController {

  constructor(FilterFormService, MapService) {
    "ngInject";

    this.filterFormSrv = FilterFormService;
    this.mapSrv = MapService;
  }

  onChange(controlName, value) {
    // console.log('controlName', JSON.stringify(controlName, null, 4));
    // console.log('control value', JSON.stringify(value, null, 4));

    this.filterFormSrv.values[controlName] = value;

    if (_.isArray(value) && _.isEmpty(value))
      delete this.filterFormSrv.values[controlName];

    // if it is an object - check at least one prop is set
    // e.g. for timeRange filter
    if (_.isObject(value)) {
      let somethingSet = false;
      _.each(value, function (prop) {
        if (prop) somethingSet = true;
      });
      if (!somethingSet)
        delete this.filterFormSrv.values[controlName];
    }
  }

  search() {
    this.mapSrv.searchVideo();
    this.mapSrv.drawSearchSrv.removeFrame();
  }

  searchable() {
    var allow = false,
      values = this.filterFormSrv.values;


    _.each(values, (value, name) => {
      switch (name) {
        case 'shapeType':
          if (this.mapSrv.drawSearchSrv.isReady()) allow = true;
          break;

        default:
          if (!_.isEmpty(values)) allow = true;
      }
    });

    return allow;
  }

}

export default FilterFormController;
