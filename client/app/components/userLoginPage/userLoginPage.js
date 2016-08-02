import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userLoginPageComponent from './userLoginPage.component';

let userLoginPageModule = angular.module('userLoginPage', [
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('loginPage', {
        url: '/login',
        //params: { from: null, },
        template: '<user-login-page></user-login-page>'
      });
  })
  .component('userLoginPage', userLoginPageComponent);

export default userLoginPageModule;
