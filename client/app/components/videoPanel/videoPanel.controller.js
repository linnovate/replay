class VideoPanelController {

  constructor(PlayListService, starService, MissionService) {
    "ngInject";

    this.playList = PlayListService;
    this.star = starService;
    this.missionSrv = MissionService;
  }

}

export default VideoPanelController;
