import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playListComponent from './playList.component';

let playListModule = angular.module('playList', [
  uiRouter
])

.component('playList', playListComponent);

export default playListModule;
