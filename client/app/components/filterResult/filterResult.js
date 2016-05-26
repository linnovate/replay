import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterResultComponent from './filterResult.component';

let filterResultModule = angular.module('filterResult', [
  uiRouter
])

.component('filterResult', filterResultComponent);

export default filterResultModule;
