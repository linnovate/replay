import angular from 'angular';
import uiRouter from 'angular-ui-router';
import PlayListService from './playList.service';
import playListComponent from './playList.component';
import playListItems from './playListItems/playListItems';
import addToPlaylist from './directive/addToPlaylist';

let playListModule = angular.module('playList', [
  uiRouter,
  playListItems.name
])
  .filter('firstLetters', function () {
    return function (input, maxWords) {
      if (!input) return input;

      if (!maxWords) maxWords = 2;
      var out = '', splitted = input.split(' '), letters = '';

      _.each(splitted, function (word) {
        if (word.length && letters.length < maxWords) letters += word[0];
      });

      return letters;
    };
  })
  .service({PlayListService})
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
  .directive({addToPlaylist})
  .component('playList', playListComponent);

export default playListModule;
