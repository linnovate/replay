import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterNumIntervalComponent from './filterNumInterval.component';

let filterNumIntervalModule = angular.module('filterNumInterval', [
  uiRouter
])

.component('filterNumInterval', filterNumIntervalComponent);

export default filterNumIntervalModule;
