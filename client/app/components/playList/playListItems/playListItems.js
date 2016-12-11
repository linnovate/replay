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
          views: {
            playListItems: {
              template: `
                <play-list-items 
                  on-delete-item="vm.onDeleteItem(item)" 
                  on-delete-list="vm.onDeleteList(list)" 
                  on-update-list-name="vm.onUpdateListName(list)">
                </play-list-items>
              `
            }
          }
        }
      );
  })
  .component('playListItems', playListItemsComponent);

export default playListItemsModule;
