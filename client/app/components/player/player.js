import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playerComponent from './player.component';
import dashJS from './dashjs.service';

let playerModule = angular.module('player', [
  uiRouter
])
.service({
  dashJS
})

.component('player', playerComponent);

export default playerModule;
