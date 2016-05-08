class VideoPanelController {

  constructor(dashJS, playListService, starService, videoService) {
    "ngInject";

    this.name = 'videoPanel';
    this.videoPlayer = dashJS;
    this.playList = playListService;
    this.star = starService;
    this.videoSrv = videoService;
  }

  playVideo(videoId) {
    var stream = this.videoSrv.getStream(videoId).then((result) => {
      this.videoPlayer.init(result.url, true);
      this.videoPlayer.setVisible(true);
    });
  }
}

export default VideoPanelController;
