import angular from 'angular';
import env from './config';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import TokenInterceptor from './service/tokenInterceptor.service';
import SessionRecoverer from './service/sessionRecoverer';
import gapiLoaded from './service/gapiLoad.service';
import VideoService from './service/video.service';
import PlayListService from './service/playList.service';
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
  .service({VideoService})
  .service({PlayListService})
  .service({starService})
  .factory({gapiLoaded})
  .config(($locationProvider, $mdThemingProvider, $httpProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo', {
        'default': '500',
        //'hue-1': '300',
        //'hue-2': '600',
        //'hue-3': 'A100'
      })
      .accentPalette('pink', {
        'default': '500'
      });

    $httpProvider.interceptors.push('SessionRecoverer');
    $httpProvider.interceptors.push('TokenInterceptor');
  })
  .component('app', AppComponent);
