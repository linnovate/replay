import _ from 'lodash';

class FilterFormController {

  constructor(FilterFormService, MapService) {
    "ngInject";

    this.filterFormSrv = FilterFormService;
    this.mapSrv = MapService;
  }

  onChange(controlName, value) {
    this.filterFormSrv.values[controlName] = value;
  }

  search() {
    this.mapSrv.searchVideo();
    this.mapSrv.drawSearchSrv.removeFrame();
  }

  searchable() {
    var allow = false;

    // console.log('this.filterFormSrv.values', JSON.stringify(this.filterFormSrv.values, null, 4));

    if (_.isEmpty(this.filterFormSrv.values)) return allow;
    else allow = true;

    if (!_.isUndefined(this.filterFormSrv.values['shapeType']) &&
      this.mapSrv.drawSearchSrv.isReady()) allow = true;

    return allow;
  }

}

export default FilterFormController;
