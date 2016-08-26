import angular from 'angular';
import env from './config';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import Auth from './service/auth.service.js';
import TokenInterceptor from './service/tokenInterceptor.service';
import SessionRecoverer from './service/sessionRecoverer';
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
  satellizer,
  env.name,
  Common.name,
  Components.name
])
  .factory({TokenInterceptor})
  .factory({SessionRecoverer})
  .service({VideoService})
  .service({PlayListService})
  .service({Auth})
  .service({starService})
  .config((ENV, $locationProvider, $mdThemingProvider, $httpProvider, $authProvider, $stateProvider) => {
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

    //$httpProvider.interceptors.push('SessionRecoverer');
    //$httpProvider.interceptors.push('TokenInterceptor');

    $authProvider.google({
      clientId: ENV.GOOGLE.CLIENT_ID,
      //scope: ['email'],
      url: ENV.API_HOST+'/auth/google'
    });

    // base route that implements auth check
    $stateProvider
      .state('auth', {
        url: '',
        abstract: true,
        data: {
          requiredLogin: true
        },
        resolve: {
          authenticate: function (Auth, $q, $timeout, $state) {
            var auth = Auth;

            if (auth.isAuthenticated()) {
              return $q.when();
            } else {
              $timeout(function () {
                $state.go(auth._stateLogin);
              });

              return $q.reject();
            }
          }
        },
        template: '<ui-view>'
      });
  })
  .component('app', AppComponent);
