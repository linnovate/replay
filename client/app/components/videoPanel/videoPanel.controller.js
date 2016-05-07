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
    var stream = this.videoSrv.getStream(videoId);
    console.log('stream', stream);
    // TODO: solve 400 bad request problem!
    //stream = 'http://vod.linnovate.net:1935/weplay/_definst_/kaltura_content/entry/data/0/0/0_rxbp6mdb_0_3ydca2k4_2.mp4/manifest_w1738406003.mpd';
    this.videoPlayer.init(stream, true);
    this.videoPlayer.setVisible(true);
  }
}

export default VideoPanelController;
