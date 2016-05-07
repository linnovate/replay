import angular from 'angular';
import uiRouter from 'angular-ui-router';
import videoPanelComponent from './videoPanel.component';

let videoPanelModule = angular.module('videoPanel', [
  uiRouter
])

.component('videoPanel', videoPanelComponent);

export default videoPanelModule;
