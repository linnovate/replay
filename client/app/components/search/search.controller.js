class SearchController {

  constructor(videoService, dashJS) {
    "ngInject";

    this.name = 'search';
    this.videoSrv = videoService;
    this.video = dashJS;
  }

  $onInit() {
      this.videoSrv.query();
  }

  playVideo(videoId) {
    var stream = this.videoSrv.getStream(videoId);
        // TODO: solve 400 bad request problem!
        stream = 'http://vod.linnovate.net:1935/weplay/_definst_/kaltura_content/entry/data/0/0/0_rxbp6mdb_0_3ydca2k4_2.mp4/manifest_w1738406003.mpd';
      this.video.init(stream, true);
      this.video.setVisible(true);
      console.log(stream);
  }
}

export default SearchController;
