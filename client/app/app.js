import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import commentService from './service/comment.service';
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
  Common.name,
  Components.name
])
  .service({videoService})
  .service({commentService})
  .service({playListService})
  .service({starService})
  .factory({gapiLoaded})
  .config(($locationProvider, $mdThemingProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('forest')
      .primaryPalette('brown')
      .accentPalette('green');
  })
  .component('app', AppComponent);
