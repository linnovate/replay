import angular from 'angular';
import env from './config';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import TokenInterceptor from './service/tokenInterceptor.service';
import SessionRecoverer from './service/sessionRecoverer';
import gapiLoaded from './service/gapiLoad.service';
import videoService from './service/video.service';
import playListService from './service/playList.service';
import starService from './service/star.service';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';

angular.module('app', [
  uiRouter,
  ngResource,
  ngMaterial,
  env.name,
  Common.name,
  Components.name
])
  .factory({TokenInterceptor})
  .factory({SessionRecoverer})
  .service({videoService})
  .service({playListService})
  .service({starService})
  .factory({gapiLoaded})
  .config(($locationProvider, $mdThemingProvider, $httpProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('forest')
      .primaryPalette('brown')
      .accentPalette('green');

    $httpProvider.interceptors.push('SessionRecoverer');
    $httpProvider.interceptors.push('TokenInterceptor');
  })
  .component('app', AppComponent);
