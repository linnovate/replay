class VideoPanelController {

  constructor(PlayListService, starService, VideoService) {
    "ngInject";

    this.playList = PlayListService;
    this.star = starService;
    this.videoSrv = VideoService;

    console.log('video', JSON.stringify(this.video, null, 4));
  }

}

export default VideoPanelController;
