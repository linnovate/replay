import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playerComponent from './player.component';

let playerModule = angular.module('player', [
  uiRouter
])

.component('player', playerComponent);

export default playerModule;
