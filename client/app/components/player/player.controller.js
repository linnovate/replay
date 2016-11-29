class PlayerController {

  constructor(dashJS, MissionService) {
    "ngInject";

    this.video = dashJS;
    this.missionSrv = MissionService;
  }

  close() {
    this.video.close();
    this.missionSrv.currentVideoId = '';
  }

  $onInit() {
  }

}

export default PlayerController;
