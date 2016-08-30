import _ from 'lodash';

class PlayListController {

  constructor(PlayListService, VideoService) {
    "ngInject";

    this.playListSrv = PlayListService;
    this.videoSrv = VideoService;
    this.playlist = this.playListSrv.getPlaylist();
    _.each(this.playlist, (list, i) => {
      this.playlist[i].count = this.playListSrv.getItemsCountByListId(list._id);
    });
  }

  getFirstLetters(str, maxWords = 2) {
    var splitted = str.split(' '),
      letters = '';

    _.each(splitted, function (word) {
      if (word.length && letters.length < maxWords) letters += word[0];
    });

    return letters;
  }

}

export default PlayListController;
