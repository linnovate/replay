import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import commentService from './service/comment.service';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
//import 'normalize.css';
import ngMaterial from 'angular-material';
import socialIcons from 'angular-material/demos/icon/demoSvgIconSets/assets/social-icons.svg';
import 'angular-material/angular-material.css';

angular.module('app', [
    uiRouter,
    ngResource,
    ngMaterial,
    Common.name,
    Components.name
  ])
  .config(($locationProvider, $mdThemingProvider, $mdIconProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('forest')
      .primaryPalette('brown')
      .accentPalette('green');
    $mdIconProvider
      .defaultIconSet(socialIcons, 24);
  })
  .service({
    commentService
  })

  .component('app', AppComponent);
