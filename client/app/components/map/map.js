import angular from 'angular';
import uiRouter from 'angular-ui-router';
import L from 'leaflet';
import        'leaflet-css';
import leafletLabel from  'leaflet-label';
import                    'leaflet-label-css';
import mapComponent from './map.component';
import MapService from './services/map.service';

let mapModule = angular.module('map', [
  uiRouter
])
  .service({MapService})
  .component('map', mapComponent);

export default mapModule;
