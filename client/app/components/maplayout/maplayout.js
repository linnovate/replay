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
      template: '<maplayout></maplayout>',
      resolve: {
        userService: 'User',
        userAuth: function(userService) {
          return userService.authInitialize();
        },
      }
    }
    );
})
.component('maplayout', maplayoutComponent);

export default maplayoutModule;
