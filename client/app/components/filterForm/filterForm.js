import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterFormComponent from './filterForm.component';

let filterFormModule = angular.module('filterForm', [
  uiRouter
])

.component('filterForm', filterFormComponent);

export default filterFormModule;
