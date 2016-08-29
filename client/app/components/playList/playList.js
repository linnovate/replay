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
          template: '<play-list></play-list>'
        }
      )
      .state('auth.map.playlistDetails', {
          url: '/playlist/:playListId',
          template: require('./playListDetails.html'),
          resolve: {
            items: function (PlayListService, $stateParams) {
              return PlayListService.getItemsByListId($stateParams.playListId)
            }
          }
        }
      );

  })

  .component('playList', playListComponent);

export default playListModule;
