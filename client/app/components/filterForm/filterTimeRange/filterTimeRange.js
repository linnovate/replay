import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterTimeRangeComponent from './filterTimeRange.component';

import datePickerJs from 'imports?moment=moment!angular-material-datetimepicker/js/angular-material-datetimepicker';
import datePickerCss from 'angular-material-datetimepicker/css/material-datetimepicker.css';

let filterTimeRangeModule = angular.module('filterTimeRange', [
  uiRouter,
  'ngMaterialDatePicker'
])

.component('filterTimeRange', filterTimeRangeComponent);

export default filterTimeRangeModule;
