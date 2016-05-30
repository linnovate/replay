import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './map.component';
import MapService from './map.service';

let mapModule = angular.module('map', [
  uiRouter
])
  .service({MapService})
  .component('map', mapComponent);

export default mapModule;
