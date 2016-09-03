import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playListItemsComponent from './playListItems.component';

let playListItemsModule = angular.module('playListItems', [
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('auth.map.playlistItems', {
          url: '/playlist/:playListId',
          component: 'playListItems',
          resolve: {
            items:        (PlayListService, $stateParams) => PlayListService.getItemsByListId($stateParams.playListId),
            currentList:  (PlayListService, $stateParams) => PlayListService.getPlaylist($stateParams.playListId)[0]
          }
        }
      );

  })
  .component('playListItems', playListItemsComponent);

export default playListItemsModule;
