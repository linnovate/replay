import angular from 'angular';
import uiRouter from 'angular-ui-router';
import maplayoutComponent from './maplayout.component';

let maplayoutModule = angular.module('maplayout', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('map', {
      url: '/map',
      data: {
        access: {
          requiredLogin: true
        }
      },
      template: '<maplayout></maplayout>'
    }
    );
})
.component('maplayout', maplayoutComponent);

export default maplayoutModule;
