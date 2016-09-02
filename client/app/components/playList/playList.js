import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playListComponent from './playList.component';

let playListModule = angular.module('playList', [
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('auth.map.playlist', {
          url: '/playlist',
          component: 'playList',
          resolve: {
            playlist: (PlayListService) => PlayListService.getPlaylist()
          }
        }
      );
  })

  .component('playList', playListComponent);

export default playListModule;
