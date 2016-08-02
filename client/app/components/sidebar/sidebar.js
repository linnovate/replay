import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sidebarComponent from './sidebar.component';

let sidebarModule = angular.module('sidebar', [
  uiRouter
])

.component('sidebar', sidebarComponent);

export default sidebarModule;
