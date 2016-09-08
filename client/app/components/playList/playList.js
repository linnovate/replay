import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playListComponent from './playList.component';
import playListItems from './playListItems/playListItems';

let playListModule = angular.module('playList', [
  uiRouter,
  playListItems.name
])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('auth.map.playlist', {
          url: '/playlist',
          views: {
            playList: {
              template: require('./playList.html'),
            }
          }
        }
      );
  })

  .component('playList', playListComponent);

export default playListModule;
