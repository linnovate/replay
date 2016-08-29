import _ from 'lodash';

class PlayListController {

  constructor(PlayListService, VideoService) {
    "ngInject";

    this.playListSrv = PlayListService;
    this.videoSrv = VideoService;
    this.playlist = this.playListSrv.getPlaylist();
  }

}

export default PlayListController;
