import angular from 'angular';
import uiRouter from 'angular-ui-router';
import feature1Component from './feature1.component';

let feature1Module = angular.module('feature1', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('feature1', {
      url: '/feature1',
      template: '<feature1></feature1>'
    });
})

.component('feature1', feature1Component);

export default feature1Module;
