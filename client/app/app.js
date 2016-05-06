import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import commentService from './service/comment.service';
import gapiLoaded from './service/gapiLoad.service';
import videoService from './service/video.service.js';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';

angular.module('app', [
  uiRouter,
  ngResource,
  ngMaterial,
  Common.name,
  Components.name
])
  .service({videoService})
  .service({commentService})
  .factory({gapiLoaded})
  .config(($locationProvider, $mdThemingProvider, $mdIconProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('forest')
      .primaryPalette('brown')
      .accentPalette('green');
  })
  .component('app', AppComponent);
