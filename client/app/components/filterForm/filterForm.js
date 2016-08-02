import angular from 'angular';
import filterFormComponent from './filterForm.component';
import filterSelectbox from './filterSelectbox/filterSelectbox';
import filterNumInterval from './filterNumInterval/filterNumInterval';
import filterGraphicButton from './filterGraphicButton/filterGraphicButton';
import FilterFormService from './filterForm.service';

let filterFormModule = angular.module('filterForm', [
  filterSelectbox.name,
  filterNumInterval.name,
  filterGraphicButton.name
])
  .service({FilterFormService})
  .component('filterForm', filterFormComponent);

export default filterFormModule;
