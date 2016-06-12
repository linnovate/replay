class PlayerController {

  constructor(dashJS, VideoService) {
    "ngInject";

    this.video = dashJS;
    this.videoSrv = VideoService;
  }

  close() {
    this.video.close();
    this.videoSrv.currentVideoId = '';
  }

  $onInit() {
  }

}

export default PlayerController;
