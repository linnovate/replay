import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterSelectboxComponent from './filterSelectbox.component';

let filterSelectboxModule = angular.module('filterSelectbox', [
  uiRouter
])

.component('filterSelectbox', filterSelectboxComponent);

export default filterSelectboxModule;
