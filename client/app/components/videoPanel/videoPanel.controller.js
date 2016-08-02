class VideoPanelController {

  constructor(PlayListService, starService, VideoService) {
    "ngInject";

    this.playList = PlayListService;
    this.star = starService;
    this.videoSrv = VideoService;
  }

}

export default VideoPanelController;
