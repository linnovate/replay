import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterFormComponent from './filterForm.component';
import filterSelectbox from './filterSelectbox/filterSelectbox';
import FilterFormService from './filterForm.service';

let filterFormModule = angular.module('filterForm', [
  uiRouter,
  filterSelectbox.name
])
  .service({FilterFormService})
  .component('filterForm', filterFormComponent);

export default filterFormModule;
